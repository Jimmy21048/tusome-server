const authRequest = (req, res, next) => {
    console.log(req.session.entity)
    if(req.session.entity) {
        
        next()
    } else {
        return res.json({error: "Not logged in!"})
    }
}

module.exports = authRequest