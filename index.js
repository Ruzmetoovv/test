const express = require('express')
const app = express()
const env = require('./config/env.config')
const productRoute = require('./routes/product.route')
const categoryRoute = require('./routes/category.route')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')

app.use(express.json())

app.use('/categories', categoryRoute)
app.use('/products',productRoute)
app.use('/users',userRoute)
app.use('/auth',authRoute)
// Homepage
app.get('/',(req,res)=>{
    res.send({url: req.originalUrl, method: req.method})
})

const port = env.PORT

app.listen(port, () => console.log(`Server is listening on port ${port}`))