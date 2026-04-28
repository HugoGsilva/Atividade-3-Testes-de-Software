const { Multa } = require('../models');

const criarMulta = async (dados) => {
  const multa = await Multa.create(dados);
  return {
    id: multa.id,
    emprestimo_id: multa.emprestimo_id,
    valor: parseFloat(multa.valor),
    data_multa: multa.data_multa,
    paga: multa.paga,
  };
};

const buscarPorId = async (id) => {
  const multa = await Multa.findByPk(id);
  if (!multa) return null;
  return {
    id: multa.id,
    emprestimo_id: multa.emprestimo_id,
    valor: parseFloat(multa.valor),
    data_multa: multa.data_multa,
    paga: multa.paga,
  };
};

module.exports = { criarMulta, buscarPorId };
