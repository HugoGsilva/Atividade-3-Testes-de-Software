const sequelize = require('../database/sequelize');
const Livro = require('./Livro');
const Usuario = require('./Usuario');
const Emprestimo = require('./Emprestimo');
const Multa = require('./Multa');

Usuario.hasMany(Emprestimo, { foreignKey: 'usuario_id' });
Livro.hasMany(Emprestimo, { foreignKey: 'livro_id' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Emprestimo.belongsTo(Livro, { foreignKey: 'livro_id' });

Emprestimo.hasOne(Multa, { foreignKey: 'emprestimo_id' });
Multa.belongsTo(Emprestimo, { foreignKey: 'emprestimo_id' });

module.exports = {
  sequelize,
  Livro,
  Usuario,
  Emprestimo,
  Multa,
};
