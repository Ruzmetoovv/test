const express = require('express')
const categoryRoute = express.Router()


categoryRoute.post('/',(req,res)=>{
    res.send({url: req.originalUrl, method: req.method})
})
categoryRoute.get('/',(req,res)=>{
    res.send({url: req.originalUrl, method: req.method})
})
categoryRoute.patch('/',(req,res)=>{
    res.send({url: req.originalUrl, method: req.method})
})
categoryRoute.delete('/',(req,res)=>{
    res.send({url: req.originalUrl, method: req.method})
})

module.exports = categoryRoute