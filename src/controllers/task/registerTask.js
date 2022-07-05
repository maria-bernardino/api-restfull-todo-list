const knex = require('../../db/conection')
const jwt = require('jsonwebtoken')
const hashPassword = require('../../utils/hash-password')

async function registerTask(req, res) {
  const { id } = req.params
  const { titulo, prazo, categoria, anexos } = req.body

  if (prazo.length > 10) {
    return res.status(400).json({ error: 'A data informada deve ser válida' })
  }

  let dateISO = new Date(prazo.split('/').reverse().join('/'))

  try {
    const user = await knex('usuarios').where({ id }).first()

    const task = await knex('tarefas')
      .insert({
        titulo,
        prazo: dateISO,
        categoria,
        usuario_id: user.id,
      })
      .returning('*')

    if (!task[0]) {
      return res.status(400).json({ error: 'Não foi possivel cadastrar tarefa' })
    }
    return res.status(201).json(task[0])
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = { registerTask }
