const knex = require('../../db/conection');
const bcrypt = require('bcrypt');

const editUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { usuario } = req;

  const verifyUser = await knex('usuarios').where('id', usuario.id).first();
  const verifyEmail = await knex('usuarios').where('id', usuario.id).first();

  if (senha && senha !== verifyUser.senha) {
    const hash = await bcrypt.hash(senha, 10);
    const userEdit = await knex('usuarios')
      .update({ nome, email, senha: hash })
      .where('id', usuario.id)
      .returning('*');

    res.status(200).json(userEdit[0]);
  } else {
    const userEdit = await knex('usuarios')
      .update({ nome, email, senha: hash })
      .where('id', usuario.id)
      .returning('*');

    res.status(200).json(userEdit[0]);
  }
};

module.exports = { editUser };
