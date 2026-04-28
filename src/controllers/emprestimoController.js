const { criarEmprestimo, buscarPorId } = require('../services/emprestimoService');

const criar = async (req, res) => {
    const { livro_id, usuario_id, data_emprestimo, status } = req.body;

    if (!livro_id || !usuario_id || !data_emprestimo || !status) {
        return res.status(400).json({ erro: 'Todos os campos sao obrigatorios' });
    }

    try {
        const emprestimo = await criarEmprestimo({ livro_id, usuario_id, data_emprestimo, status });
        res.status(201).json(emprestimo);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

const obterPorId = async (req, res) => {
    const emprestimo = await buscarPorId(req.params.id);
    if (!emprestimo) {
        return res.status(404).json({ message: 'Esse emprestimo nao existe!' });
    }
    res.status(200).json(emprestimo);
};

module.exports = { criar, obterPorId };
