
const authRequest = (req, res, next) => {
    if(req.session.user) {
        next()
    } else {
        return res.json({error: "Not logged in!"})
    }
}

module.exports = authRequest