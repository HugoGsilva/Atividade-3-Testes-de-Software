const { Multa } = require('../models');

const criarMulta = async (dados) => {
  const paga = dados.paga !== undefined ? dados.paga : (dados.quitado !== undefined ? !!dados.quitado : false);
  const data_multa = dados.data_multa || new Date().toISOString().split('T')[0];
  const { emprestimo_id, valor } = dados;
  const multa = await Multa.create({ emprestimo_id, valor, paga, data_multa });
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

const listarMultas = async () => {
  const multas = await Multa.findAll({ order: [['id', 'ASC']] });
  return multas.map((m) => ({
    id: m.id,
    emprestimo_id: m.emprestimo_id,
    valor: parseFloat(m.valor),
    data_multa: m.data_multa,
    paga: m.paga,
  }));
};

const atualizarMulta = async (id, dados) => {
  const multa = await Multa.findByPk(id);
  if (!multa) return null;
  if (dados.valor !== undefined) multa.valor = dados.valor;
  if (dados.data_multa !== undefined) multa.data_multa = dados.data_multa;
  
  const paga = dados.paga !== undefined ? dados.paga : (dados.quitado !== undefined ? !!dados.quitado : undefined);
  if (paga !== undefined) multa.paga = paga;

  await multa.save();
  return {
    id: multa.id,
    emprestimo_id: multa.emprestimo_id,
    valor: parseFloat(multa.valor),
    data_multa: multa.data_multa,
    paga: multa.paga,
  };
};

const quitarMulta = async (id) => {
  const multa = await Multa.findByPk(id);
  if (!multa) return null;
  multa.paga = true;
  await multa.save();
  return {
    id: multa.id,
    emprestimo_id: multa.emprestimo_id,
    valor: parseFloat(multa.valor),
    data_multa: multa.data_multa,
    paga: multa.paga,
  };
};

const deletarMulta = async (id) => {
  const multa = await Multa.findByPk(id);
  if (!multa) return null;
  await multa.destroy();
  return true;
};

module.exports = { criarMulta, buscarPorId, listarMultas, atualizarMulta, quitarMulta, deletarMulta };
