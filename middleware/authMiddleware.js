const authRequest = (req, res, next) => {
    if(req.session.entity) {
        next()
    } else {
        return res.json({valid: false})
    }
}

module.exports = authRequest