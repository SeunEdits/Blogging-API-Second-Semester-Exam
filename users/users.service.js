const jwt = require('jsonwebtoken')
const User = require('./users.model')

const generateToken = (id) => {
    return jwt.sign( { id }, process.env.JWT_SECRET || 'test_secret', { expiresIn: "1h" })
}

const CreateUser = async({ firstName, lastName, email, password }) => {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return { status: 409, success: false, message: 'User already exists' }
    }

    const user = await User.create({ firstName, lastName , email, password })

    const token = generateToken(user._id)

    return { status: 201, success: true, data: { user, token }}
}

const LoginUser = async (decoded) => {
    const email = decoded[0]
    const password = decoded[1]
    const user = await User.findOne({ email })

    if (!user) {
        return { status: 400, success: false, message: 'Invalid credentials' }
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return { status: 400, success: false, message: 'Invalid credentials' }
    }

        const token = generateToken(user._id)

        return { status: 200, success: true,message: 'Login Successful', data: { user, token } }
}

module.exports = {
    CreateUser,
    LoginUser
}