const express = require('express');
const { deleteList } = require('../controllers/task/deleteList');
const { editList } = require('../controllers/task/editList');
const { listTask } = require('../controllers/task/listTasks');
const { registerTask } = require('../controllers/task/registerTask');
const authenticateAccess = require('../Middlewares/authenticateAcess');

const routerTask = express();

routerTask.use(authenticateAccess);
routerTask.get('/tarefas', listTask);
routerTask.post('/tarefas', registerTask);
routerTask.put('/tarefas/:id', editList);
routerTask.delete('/tarefas/:id', deleteList);

module.exports = routerTask;
