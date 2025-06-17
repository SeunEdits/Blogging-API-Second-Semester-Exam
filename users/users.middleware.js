const jwt = require('jsonwebtoken')
const User = require('./users.model')

const AuthroizeUser = async (req, res, next) => {
    const bearerToken = req.headers['authorization']

    if (!bearerToken) {
        return res.status(401).json({
            message: 'Authorization failed'
        })
    }

    const tokenArray = bearerToken.split(' ')

    const token = tokenArray[1]

    if (!token) {
        return res.status(401).json({
            message: 'Authorization failed'
        })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET || 'test_secret')
        const user = await User.findById(decoded.id);
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Authorization failed'
        })
    }

}

const getNextAuthorID = async (req, res, next) => {
    prevauthor = await User.find().sort({"authorID":-1}).limit(1)
    if (prevauthor) {
        req.prevauthor = prevauthor
    } else {
        req.prevauthor = {}
    }

    // prevauthor ? authorID = prevauthor.authorID+1 : authorID = 1
    next()
}

module.exports = {
    AuthroizeUser,
    getNextAuthorID
}