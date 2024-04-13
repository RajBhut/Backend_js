const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT

app.get('/', (req , res) => {res.send("Hellow world!!")})

app.listen(port , ()=>{
    console.log(`app is listening on ${port}` )
})