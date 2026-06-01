const { criarEmprestimo, buscarPorId, listarEmprestimos, atualizarEmprestimo, deletarEmprestimo } = require('../services/emprestimoService');

const criar = async (req, res) => {
    const { livro_id, usuario_id, data_emprestimo, status, data_devolucao_prevista } = req.body;

    if (!livro_id || !usuario_id) {
        return res.status(400).json({ erro: 'Todos os campos sao obrigatorios' });
    }

    const dataEmp = data_emprestimo || new Date().toISOString().split('T')[0];
    const stat = status || 'ativo';

    try {
        const emprestimo = await criarEmprestimo({ 
            livro_id, 
            usuario_id, 
            data_emprestimo: dataEmp, 
            status: stat,
            data_devolucao_prevista
        });
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

const listar = async (req, res) => {
    const emprestimos = await listarEmprestimos();
    res.status(200).json(emprestimos);
};

const atualizar = async (req, res) => {
    const emprestimo = await atualizarEmprestimo(req.params.id, req.body);
    if (!emprestimo) {
        return res.status(404).json({ erro: 'Emprestimo nao encontrado' });
    }
    res.status(200).json(emprestimo);
};

const deletar = async (req, res) => {
    const emprestimo = await deletarEmprestimo(req.params.id);
    if (!emprestimo) {
        return res.status(404).json({ erro: 'Emprestimo nao encontrado' });
    }
    res.status(200).json({ mensagem: 'Emprestimo removido' });
};

module.exports = { criar, obterPorId, listar, atualizar, deletar };
