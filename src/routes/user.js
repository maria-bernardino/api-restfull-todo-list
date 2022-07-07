const express = require('express');
const { editUser } = require('../controllers/user/editUser');
const { login } = require('../controllers/user/login');
const { signUp } = require('../controllers/user/registerUser');
const authenticateAccess = require('../Middlewares/authenticateAcess');
const { verifyEmailSignup } = require('../Middlewares/verify');

const routerUser = express();

routerUser.post('/signup', verifyEmailSignup, signUp);
routerUser.post('/login', login);

// routerUser.use(authenticateAccess)

routerUser.put('/usuario/:id', editUser);

module.exports = routerUser;
