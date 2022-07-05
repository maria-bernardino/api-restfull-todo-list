const knex = require('../db/conection')
const jwt = require('jsonwebtoken')
const hashPassword = require('../utils/hash-password')

const authenticateAccess = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Acesso não autorizado.' })
  }

  try {
    const token = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, hashPassword)

    const userFound = await knex('usuarios').where({ id }).first()

    if (!userFound) {
      return res.status(404).json({ error: 'Usuario não encontrado' })
    }

    const { senha, ...usuario } = userFound

    req.usuario = usuario

    next()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = authenticateAccess
