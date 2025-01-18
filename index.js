const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConnection = require('./config')
const session = require('express-session');

const app = express()

app.use(session({
    secret: 'my_secret_session',
    resave: true,
    saveUninitialized: false,
    name: 'tus_cook',
    cookie: {
        maxAge: 3600000
    }
}))

app.use((req, res, next) => {
    res.locals.user = req.session.user
    next()
})

app.use(express.json())

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    allowedHeaders : ["GET", "POST", "Content-Type"]
}))

const authRoute = require('./routes/auth')
app.use('/auth', authRoute)

dbConnection.connect((dbErr) => {
    if(dbErr) return console.log(dbErr);
    console.log("DB connected")
    
    app.listen(process.env.SERVER_PORT || 3000, (err) => {
        if(err) return console.log(err);
        console.log(`Server up and running at ${process.env.SERVER_PORT}`)
    })
})
