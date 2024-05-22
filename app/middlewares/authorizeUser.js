const authorizeUser = (permittedRoles) => { // Access control whether they have permissions.
    return (req, res, next) => {
        if(permittedRoles.includes(req.user.role)) {
            next()
        } else {
            res.status(403).json({ error: 'you dont have permission to access this route'}) // status 403 is for forbidden 
        }
    }
}

module.exports = authorizeUser