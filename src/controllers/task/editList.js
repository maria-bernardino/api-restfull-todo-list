const knex = require('../../db/conection');

async function editList(req, res) {
  const { id } = req.params;
  const { titulo, descricao, prazo, membro, categoria } = req.body;

  try {
    const listUpdate = await knex('tarefas').where({ id }).first().update({
      titulo,
      descricao,
      prazo,
      membro,
      categoria,
    });

    if (!listUpdate) {
      return res.status(404).json({ mensagem: 'Não foi possivel realizar a edição' });
    }

    return res.status(201).json({ mensagem: 'Dados atualizados com sucesso' });
  } catch (error) {
    return res.status(500).json(error.mensage);
  }
}
module.exports = { editList };
