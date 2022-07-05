const knex = require('../../db/conection');
const bcrypt = require('bcrypt');

const editUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.params;

    const verifyUser = await knex('usuarios').where({id}).first();

    if(senha && senha !== verifyUser.senha){
        const hash = await bcrypt.hash(senha, 10);
        const userEdit = await knex('usuarios')
        .update({nome, email, senha: hash})
        .where({id})
        .returning('*');
        
        res.status(200).json(userEdit[0])
    } else {
        const userEdit = await knex('usuarios')
        .update({nome, email, senha: hash})
        .where({id})
        .returning('*');

        res.status(200).json(userEdit[0])
        
    }
}


module.exports = { editUser };