const knex = require('../../db/conection');

async function deleteList(req, res) {
  const { id } = req.params;

  try {
    const list = await knex('tarefas').where({ id }).first().delete();

    if (!list) {
      return res.status(404).json('Tarefa não existe');
    }
    return res.status(200).json('Tarefa excluía com sucesso');
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  deleteList,
};
