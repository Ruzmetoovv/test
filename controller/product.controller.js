function createProduct(req,res){
    res.send({method: req.method, url: req.originalUrl, id: req.id, role: req.role })
}
function findAllProduct(req,res){
    console.log(req.id);
    res.send({method: req.method, url: req.originalUrl, id: req.id, role: req.role })
}
function findByIdProduct(req,res){
    res.send({method: req.method, url: req.originalUrl })
}
function updateProduct(req,res){
    res.send({method: req.method, url: req.originalUrl })
}
function deleteProduct(req,res){
    res.send({method: req.method, url: req.originalUrl })
}


module.exports = {
    createProduct,
    findAllProduct,
    findByIdProduct,
    updateProduct,
    deleteProduct
}