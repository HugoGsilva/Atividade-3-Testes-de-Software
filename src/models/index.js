const sequelize = require('../database/sequelize');
const Livro = require('./Livro');
const Usuario = require('./Usuario');
const Emprestimo = require('./Emprestimo');

Usuario.hasMany(Emprestimo, { foreignKey: 'usuario_id' });
Livro.hasMany(Emprestimo, { foreignKey: 'livro_id' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Emprestimo.belongsTo(Livro, { foreignKey: 'livro_id' });

module.exports = {
  sequelize,
  Livro,
  Usuario,
  Emprestimo,
};
