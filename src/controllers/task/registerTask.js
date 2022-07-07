const knex = require('../../db/conection');

async function registerTask(req, res) {
  const { usuario } = req;
  const { titulo, descricao, prazo, membro, categoria } = req.body;

  if (prazo.length > 10) {
    return res.status(400).json({ error: 'A data informada deve ser válida' });
  }

  let dateISO = new Date(prazo.split('/').reverse().join('/'));

  try {
    const user = await knex('usuarios').where('id', usuario.id).first();
    if (!user) {
      res.status(404).json('Usuario não encontrado');
    }

    const task = await knex('tarefas')
      .insert({
        titulo,
        descricao,
        prazo: dateISO,
        categoria,
        membro,
        usuario_id: user.id,
      })
      .returning('*');

    if (!task[0]) {
      return res.status(400).json({ error: 'Não foi possivel cadastrar tarefa' });
    }
    return res.status(201).json(task[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { registerTask };
