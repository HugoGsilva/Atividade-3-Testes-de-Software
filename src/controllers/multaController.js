const { criarMulta, buscarPorId } = require('../services/multaService');

const criar = async (req, res) => {
    const { emprestimo_id, valor, data_multa, paga } = req.body;

    if (!emprestimo_id || valor === undefined || !data_multa) {
        return res.status(400).json({ erro: 'Todos os campos sao obrigatorios' });
    }

    try {
        const multa = await criarMulta({ emprestimo_id, valor, data_multa, paga });
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

module.exports = { criar, obterPorId };
