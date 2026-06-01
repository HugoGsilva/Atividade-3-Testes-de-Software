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

module.exports = { listarLivros, criarLivro, buscarPorId };
