const express = require('express');
const { editUser } = require('../controllers/user/editUser');
const { login } = require('../controllers/user/login');
const { signUp } = require('../controllers/user/registerUser');
const authenticateAccess = require('../Middlewares/authenticateAcess');
const { verifyEmailSignup, verifyEmailLogin } = require('../Middlewares/verify');

const routerUser = express();

routerUser.post('/usuario', verifyEmailSignup, signUp);
routerUser.post('/login', verifyEmailLogin, login);

routerUser.use(authenticateAccess);

routerUser.put('/usuario/:id', editUser);

module.exports = routerUser;
