const { criarMulta, buscarPorId, listarMultas, atualizarMulta, quitarMulta, deletarMulta } = require('../services/multaService');

const criar = async (req, res) => {
    const { emprestimo_id, valor } = req.body;

    if (!emprestimo_id || valor === undefined) {
        return res.status(400).json({ erro: 'Todos os campos sao obrigatorios' });
    }

    try {
        const multa = await criarMulta(req.body);
        res.status(201).json(multa);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

const obterPorId = async (req, res) => {
    const multa = await buscarPorId(req.params.id);
    if (!multa) {
        return res.status(404).json({ message: 'Essa multa nao existe!' });
    }
    res.status(200).json(multa);
};

const listar = async (req, res) => {
    const multas = await listarMultas();
    res.status(200).json(multas);
};

const atualizar = async (req, res) => {
    const multa = await atualizarMulta(req.params.id, req.body);
    if (!multa) {
        return res.status(404).json({ erro: 'Multa nao encontrada' });
    }
    res.status(200).json(multa);
};

const quitar = async (req, res) => {
    const multa = await quitarMulta(req.params.id);
    if (!multa) {
        return res.status(404).json({ erro: 'Multa nao encontrada' });
    }
    res.status(200).json(multa);
};

const deletar = async (req, res) => {
    const multa = await deletarMulta(req.params.id);
    if (!multa) {
        return res.status(404).json({ erro: 'Multa nao encontrada' });
    }
    res.status(200).json({ mensagem: 'Multa removida' });
};

module.exports = { criar, obterPorId, listar, atualizar, quitar, deletar };
