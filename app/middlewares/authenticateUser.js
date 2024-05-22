const jwt = require('jsonwebtoken') // Protected Routes.
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) {
        return res.status(400).json({ error: 'token is required'})
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET) // verifying token with the help of secret key.
        req.user = {   // only way to pass data from one function to another so that you can read it in other function
            // After login token is generated we have to store it in request object for user_Id it is extracted from here.
            id: tokenData.id,
            role: tokenData.role 
        }
        next()
    } catch(err) {
        return res.status(400).json({ error: err })
    }
}

module.exports = authenticateUser