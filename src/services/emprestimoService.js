const { Emprestimo } = require('../models');

const criarEmprestimo = async (dados) => {
  const emprestimo = await Emprestimo.create(dados);
  return {
    id: emprestimo.id,
    livro_id: emprestimo.livro_id,
    usuario_id: emprestimo.usuario_id,
    data_emprestimo: emprestimo.data_emprestimo,
    data_devolucao: emprestimo.data_devolucao,
    status: emprestimo.status,
  };
};

const buscarPorId = async (id) => {
  const emprestimo = await Emprestimo.findByPk(id);
  if (!emprestimo) return null;
  return {
    id: emprestimo.id,
    livro_id: emprestimo.livro_id,
    usuario_id: emprestimo.usuario_id,
    data_emprestimo: emprestimo.data_emprestimo,
    data_devolucao: emprestimo.data_devolucao,
    status: emprestimo.status,
  };
};

module.exports = { criarEmprestimo, buscarPorId };
