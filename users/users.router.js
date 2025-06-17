const express = require('express')
const GetAuthorID = require('./users.middleware')

const router = express.Router();

const UserController = require('./users.controller')

router.post('/signup',GetAuthorID.getNextAuthorID, UserController.CreateUser)

router.get('/login', UserController.LoginUser)

module.exports = router;