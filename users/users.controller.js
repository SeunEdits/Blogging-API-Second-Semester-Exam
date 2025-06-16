const UserService = require('./users.service')

const CreateUser = async (req, res) => {
    serviceResponse = await UserService.CreateUser(req.body)

    res.status(serviceResponse.status).json(serviceResponse);
}

const LoginUser = async (req, res) => {
    var credentials= req.headers.authorization
    credentials = credentials.split(' ')
    decoded = Buffer.from(credentials[1], 'base64').toString('utf-8').split(':')
    const serviceResponse = await UserService.LoginUser(decoded)
    res.status(serviceResponse.status).json(serviceResponse);
}

module.exports = {
    CreateUser,
    LoginUser
}