const knex = require('../db/conection');

const verifyEmailLogin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await knex('usuarios').where('email', email).first();

    if (!user) {
      return res.status(404).json('E-mail não encontrado');
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }

  next();
};

const verifyEmailSignup = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userInfo = await knex('usuarios').where('email', email).first();

    if (userInfo) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

module.exports = { verifyEmailLogin, verifyEmailSignup };
