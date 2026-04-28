const { criarUsuario, buscarPorId } = require('../services/usuarioService');

const criar = async (req, res) => {
    const { nome, email, tipo } = req.body;

    if (!nome || !email || !tipo) {
        return res.status(400).json({ erro: 'nome, email e tipo são obrigatórios' });
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

module.exports = { criar, obterPorId };
