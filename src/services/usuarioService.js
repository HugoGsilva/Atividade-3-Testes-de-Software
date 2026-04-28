const { Usuario } = require('../models');

const criarUsuario = async (dados) => {
  const usuario = await Usuario.create(dados);
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
  };
};

const buscarPorId = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
  };
};

module.exports = { criarUsuario, buscarPorId };
