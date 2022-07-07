const knex = require('../../db/conection');

async function listTask(req, res) {
  const { usuario } = req;

  try {
    const tasks = await knex('tarefas').where({ usuario_id: usuario.id }).returning('*');

    if (!tasks) {
      return res.status(404).json('Você nao possui tarefas');
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { listTask };
