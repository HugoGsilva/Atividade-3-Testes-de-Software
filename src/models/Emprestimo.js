const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Emprestimo = sequelize.define('Emprestimo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  livro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_emprestimo: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  data_devolucao: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('ativo', 'devolvido', 'atrasado'),
    allowNull: false,
  },
}, {
  tableName: 'emprestimos',
  timestamps: true,
  underscored: false,
});

module.exports = Emprestimo;
