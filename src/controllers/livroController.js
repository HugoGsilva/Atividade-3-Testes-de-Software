const { criarLivro, buscarPorId } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios'})

    const livro = await criarLivro(titulo, autor);
    res.status(201).json(livro);
}

const obterPorId = async (req, res) => {
    const livro = await buscarPorId(req.params.id);
    if (!livro) {
        return res.status(404).json({ erro: 'Livro nao encontrado' });
    }
    res.status(200).json(livro);
}

module.exports = { criar, obterPorId };