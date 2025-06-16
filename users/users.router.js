const express = require('express')

const router = express.Router();

const UserController = require('./users.controller')

router.post('/signup', UserController.CreateUser)

router.get('/login', UserController.LoginUser)

module.exports = router;