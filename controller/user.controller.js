const db = require("../config/db.config");
const apiResponse = require("../utils/API-response.util");
const Pagination = require("../utils/pagination.util");

async function createUser(req, res) {
  // Error handling
  try {
    sqlQuery = "INSERT INTO users SET ?";
    const { name, lastName, phone, email } = req.body;

    await db.query(sqlQuery, req.body);
    res.status(201).send("Created");
  } catch (error) {
    res.status(500).json(error);
  }
}
async function findAllUser(req, res) {
  try {
    const page = +req.query.page
    const limit = +req.query.limit

    if(req.query.page && req.query.limit && (isNaN(page) || page < 1 || isNaN(limit) || limit < 1)){
      const error = new Error("limit or|and page must be a positive integer")
      error.status = 400
      throw error
    }

    const countQuery = "SELECT COUNT(id) FROM users";
    const [[result]] = await db.query(countQuery);
    const totalItems = result["COUNT(id)"]

    const pagination = new Pagination(totalItems,+page,+limit)

    const [users] = await db.query("SELECT * FROM users LIMIT ? OFFSET ?",[pagination.limit, pagination.offset])
    
    apiResponse(res,200,users,null,pagination)

  } catch (error) {
    apiResponse(res,error.status || 500,null,error.message)
  }
}
async function getByIdUser(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM users WHERE id = ?";
    const [[user]] = await db.query(query, id);
    res.json(user || null);
  } catch (error) {
    res.json({ error: error.message });
  }
}
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id);
    if (!user) {
      const error = new Error(`User with id: ${id} not found`);
      error.status = 404;
      throw error;
    }
    const updateSql = "UPDATE users SET ? WHERE id = ?";
    await db.query(updateSql, [req.body, id]);
    res.send("sukkes");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id);
    if (!user) {
      const error = new Error(`User with id: ${id} not found`);
      error.status = 404;
      throw error;
    }
    await db.query("DELETE FROM users WHERE id = ?", id);
    res.send("sukkes");
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  findAllUser,
  getByIdUser,
  updateUser,
  deleteUser,
};

