const express = require('express')
const { registerTask } = require('../controllers/task/registerTask')
const authenticateAccess = require('../Middlewares/authenticateAcess')

const routerTask = express()

routerTask.use(authenticateAccess)

routerTask.post('/cadastrar/:id', registerTask)

module.exports = routerTask
