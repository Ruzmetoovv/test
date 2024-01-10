const { hashSync, compareSync } = require("bcrypt");
const db = require("../config/db.config");
const { sign } = require("jsonwebtoken");
const env = require("../config/env.config");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error("email and password fields must be provided");
    error.status = 400;
    throw error;
  }
  const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email);
  if (!user) {
    const error = new Error(`User with email: ${email} not found`);
    error.status = 404;
    throw error;
  }
  const isRightPassword = compareSync(password, user.password);

  if (!isRightPassword) {
    const error = new Error("Wrong email or|and passwword");
    error.status = 400;
    throw error;
  }

  const accessToken = sign({ id: user.id, role: user.role }, env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
  const refreshToken = sign({ id: user.id, role: user.role }, env.REFRESH_TOKEN_SECRET, { expiresIn: "180s" });

  res.json({ accessToken, refreshToken });
  const hashedRefreshToken = hashSync(refreshToken, 1);
  db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [hashedRefreshToken, user.id]);
}

async function register(req, res) {
  try {
    const { email, name, password, last_name, phone } = req.body;
    const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email);
    if (user) {
      const error = new Error(`User with email: ${email} already exists`);
      error.status = 406;
      throw error;
    }
    const hashedPassword = hashSync(password, 1);
    const paramObj = {
      name,
      last_name,
      phone,
      email,
      password: hashedPassword,
    };
    const [{ insertId }] = await db.query("INSERT INTO users SET ?", paramObj);
    const accessToken = sign({ id: insertId, role: "user" }, env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
    const refreshToken = sign({ id: insertId, role: "user" }, env.REFRESH_TOKEN_SECRET, { expiresIn: "180s" });
    res.json({ refreshToken, accessToken });
    const hashedRefreshToken = hashSync(refreshToken, 1);
    db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [hashedRefreshToken, insertId]);
  } catch (error) {
    console.error(error.message);
    res.status(error.status || 500).json({ error: "Cannot create user: " + error.message });
  }
}

async function refresh(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      const error = new Error("refreshToken must be provided");
      error.status = 400;
      throw error;
    }
    const decodedToken = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
    const { id, role } = decodedToken;
    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id);
    console.log(user.refresh_token);
    const sameToken = compareSync(refreshToken, user.refresh_token)
    console.log(sameToken);
    if (!sameToken) {
      const error = new Error("Invalid Jwt");
      error.status = 406;
      throw error;
    }
    const accessToken = jwt.sign({ id: user.id, role: user.role }, env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
    const newRefreshToken = jwt.sign({ id: user.id, role: user.role }, env.REFRESH_TOKEN_SECRET, { expiresIn: "180s" });
    res.json({ newRefreshToken, accessToken })
    const hashedRefreshToken = hashSync(newRefreshToken, 10)
    db.query('UPDATE users SET refresh_token = ? WHERE id = ?',[hashedRefreshToken,id])
  } catch (error) {
    res.json({error: "Error validating refresh token: " +error.message})
  }
}

async function logout(req, res) {}

module.exports = {
  register,
  login,
  logout,
  refresh,
};
