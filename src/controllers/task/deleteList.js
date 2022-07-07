const knex = require('../../db/conection');

async function deleteList(req, res) {
  const { id } = req.params;

  const list = await knex('tarefas').where({ id }).first().delete().returning();

  res.status(200).json('Tarefa excluía com sucesso');
}

module.exports = {
  deleteList,
};
