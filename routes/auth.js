const express = require('express')
const router = express.Router();
// const authenticate = require('../middleware/authMiddleware').authRequest
const bcrypt = require('bcrypt')
const connection = require('../config')

router.post('/login', (req, res) => {
    const username = req.body.username
    const pwd = req.body.pwd

    const query = "SELECT user_name, user_email, user_pwd FROM reader_users WHERE user_name = ? OR user_email = ?"
    const values = [username, username]

    connection.query(query, values, async (err, result) => {
        if(err) return console.log(err);

        if(result.length > 0) {
            const isPasswordMatch = await bcrypt.compare(pwd, result[0].user_pwd)
            if(isPasswordMatch) {
                req.session.entity = { username: result[0].user_name, email: result[0].user_email }
                return res.json({success: "login successful"})
            }
        }
        return res.json({error: "username or password incorrect"})
    })
    
})

router.post('/signup', (req, res) => {

    const username = req.body.username
    const email = req.body.email
    const pwd = req.body.pwd

    if(username.length < 5 || pwd.length < 5) {
        return res.json({error: "username and password must be 5+ characters"})
    }

    const query = "SELECT user_name, user_email FROM reader_users WHERE user_name = ? OR user_email = ?;"
    const values = [username, email]
    connection.query(query, values, async (err, result) => {
        if(err) return console.log(err);

        if(result.length > 0) {
            return res.json({error: "username or password already exists"});
        } 

        const hashedPwd = await bcrypt.hash(pwd, 10)
        const query1 = "INSERT INTO reader_users (user_name, user_pwd, user_email) VALUES (?, ?, ?);"
        const values1 = [username, hashedPwd, email]
        connection.query(query1, values1, (err) => {
            if(err) return console.log(err);
            return res.json({success: "signup successful"})
        })
    })


})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie('tus_cook')
})
module.exports = router