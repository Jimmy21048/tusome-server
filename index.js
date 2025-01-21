const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConnection = require('./config')
const session = require('express-session');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors({
    origin : [process.env.CORS_ORIGIN],
    allowedHeaders : ["GET", "POST", "Content-Type"],
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'my_secret_session',
    resave: true,
    saveUninitialized: false,
    name: 'tus_cook',
    cookie: {
        maxAge: 3600000,
        // sameSite: 'lax'
    }
}))

app.use(express.json())

const authRoute = require('./routes/auth')
app.use('/auth', authRoute)

const accountRoute = require('./routes/account');
app.use('/account', accountRoute)

dbConnection.connect((dbErr) => {
    if(dbErr) return console.log(dbErr);
    console.log("DB connected")
    
    app.listen(process.env.SERVER_PORT || 3000, (err) => {
        if(err) return console.log(err);
        console.log(`Server up and running at ${process.env.SERVER_PORT}`)
    })
})
