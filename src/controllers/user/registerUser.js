const knex = require('../../db/conection');
const bcrypt = require('bcrypt');

async function signUp(req, res){
    const { nome, email, senha } = req.body;

    try {
        const hash = await bcrypt.hash(senha,10);
        const user = await knex('usuarios').insert({nome, email, senha: hash});
        
        if(!user){
            return res.status(400).json({ error: 'Error ao realizar cadastro'});
        }
        return res.status(201).json();

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    signUp
}