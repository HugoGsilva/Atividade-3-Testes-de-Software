const { criarUsuario, buscarPorId, listarUsuarios, atualizarUsuario, deletarUsuario } = require('../services/usuarioService');

const criar = async (req, res) => {
    const { nome, email, tipo } = req.body;

    if (!nome || !email || !tipo) {
        return res.status(400).json({ erro: 'Todos os campos sao obrigatorios' });
    }

    try {
        const usuario = await criarUsuario({ nome, email, tipo });
        res.status(201).json(usuario);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

const obterPorId = async (req, res) => {
    const usuario = await buscarPorId(req.params.id);
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuario nao encontrado' });
    }
    res.status(200).json(usuario);
};

const listar = async (req, res) => {
    const usuarios = await listarUsuarios();
    res.status(200).json(usuarios);
};

const atualizar = async (req, res) => {
    try {
        const usuario = await atualizarUsuario(req.params.id, req.body);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuario nao encontrado' });
        }
        res.status(200).json(usuario);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

const deletar = async (req, res) => {
    const usuario = await deletarUsuario(req.params.id);
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuario nao encontrado' });
    }
    res.status(200).json({ mensagem: 'Usuario removido' });
};

module.exports = { criar, obterPorId, listar, atualizar, deletar };
