const express = require('express')
const authMiddleware = require('./auth')

const app = express()
const port = 3000

app.use(authMiddleware);

app.get('/', (req,res)=>{
    res.send('Hello world ! ')
})

app.listen(port,()=>{
    console.log(`Port Listening ${port}`);
})