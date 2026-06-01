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

const listarUsuarios = async () => {
  const usuarios = await Usuario.findAll({ order: [['id', 'ASC']] });
  return usuarios.map((u) => ({
    id: u.id,
    nome: u.nome,
    email: u.email,
    tipo: u.tipo,
  }));
};

const atualizarUsuario = async (id, dados) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  if (dados.nome !== undefined) usuario.nome = dados.nome;
  if (dados.email !== undefined) usuario.email = dados.email;
  if (dados.tipo !== undefined) usuario.tipo = dados.tipo;
  await usuario.save();
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
  };
};

const deletarUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  await usuario.destroy();
  return true;
};

module.exports = { criarUsuario, buscarPorId, listarUsuarios, atualizarUsuario, deletarUsuario };
