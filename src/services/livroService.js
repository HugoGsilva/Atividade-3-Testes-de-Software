const { Livro } = require('../models');

const listarLivros = async () => {
  const livros = await Livro.findAll({ order: [['id', 'ASC']] });
  return livros.map((livro) => ({
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  }));
};

const criarLivro = async (titulo, autor) => {
  const livro = await Livro.create({ titulo, autor });
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
};

const buscarPorId = async (id) => {
  const livro = await Livro.findByPk(id);
  if (!livro) return null;
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
};

const atualizarLivro = async (id, dados) => {
  const livro = await Livro.findByPk(id);
  if (!livro) return null;
  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  await livro.save();
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
};

const deletarLivro = async (id) => {
  const livro = await Livro.findByPk(id);
  if (!livro) return null;
  await livro.destroy();
  return true;
};

module.exports = { listarLivros, criarLivro, buscarPorId, atualizarLivro, deletarLivro };
