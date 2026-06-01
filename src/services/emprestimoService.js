const { Emprestimo } = require('../models');

const criarEmprestimo = async (dados) => {
  const emprestimo = await Emprestimo.create(dados);
  return {
    id: emprestimo.id,
    livro_id: emprestimo.livro_id,
    usuario_id: emprestimo.usuario_id,
    data_emprestimo: emprestimo.data_emprestimo,
    data_devolucao: emprestimo.data_devolucao,
    data_devolucao_prevista: emprestimo.data_devolucao_prevista,
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
    data_devolucao_prevista: emprestimo.data_devolucao_prevista,
    status: emprestimo.status,
  };
};

const listarEmprestimos = async () => {
  const emprestimos = await Emprestimo.findAll({ order: [['id', 'ASC']] });
  return emprestimos.map((e) => ({
    id: e.id,
    livro_id: e.livro_id,
    usuario_id: e.usuario_id,
    data_emprestimo: e.data_emprestimo,
    data_devolucao: e.data_devolucao,
    data_devolucao_prevista: e.data_devolucao_prevista,
    status: e.status,
  }));
};

const atualizarEmprestimo = async (id, dados) => {
  const emprestimo = await Emprestimo.findByPk(id);
  if (!emprestimo) return null;
  if (dados.status !== undefined) emprestimo.status = dados.status;
  if (dados.data_devolucao !== undefined) emprestimo.data_devolucao = dados.data_devolucao;
  if (dados.data_devolucao_prevista !== undefined) emprestimo.data_devolucao_prevista = dados.data_devolucao_prevista;
  await emprestimo.save();
  return {
    id: emprestimo.id,
    livro_id: emprestimo.livro_id,
    usuario_id: emprestimo.usuario_id,
    data_emprestimo: emprestimo.data_emprestimo,
    data_devolucao: emprestimo.data_devolucao,
    data_devolucao_prevista: emprestimo.data_devolucao_prevista,
    status: emprestimo.status,
  };
};

const deletarEmprestimo = async (id) => {
  const emprestimo = await Emprestimo.findByPk(id);
  if (!emprestimo) return null;
  await emprestimo.destroy();
  return true;
};

module.exports = { criarEmprestimo, buscarPorId, listarEmprestimos, atualizarEmprestimo, deletarEmprestimo };
