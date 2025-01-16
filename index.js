const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConnection = require('./config')

const app = express()

app.use(express.json())

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    allowedHeaders : ["GET", "POST"]
}))

dbConnection.connect((dbErr) => {
    if(dbErr) return console.log(dbErr);
    console.log("DB connected")
    
    app.listen(process.env.SERVER_PORT || 3000, (err) => {
        if(err) return console.log(err);
        console.log(`Server up and running at ${process.env.SERVER_PORT}`)
    })
})
