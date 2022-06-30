const express = require('express');
const { signUp} = require('../controllers/user/registerUser');


const routerUser = express();
routerUser.post('/usuario',  signUp);

module.exports = routerUser;