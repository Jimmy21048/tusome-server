const express = require('express')
const router = express.Router()
const authRequest = require('../middleware/authMiddleware')

router.get('/', authRequest, (req, res) => {
    console.log("here")
})

module.exports = router