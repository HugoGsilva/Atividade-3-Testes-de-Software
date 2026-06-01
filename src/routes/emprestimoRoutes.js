const { Router } = require('express');
const { criar, obterPorId, listar, atualizar, deletar } = require('../controllers/emprestimoController');

const router = Router();

router.get('/', listar);
router.post('/', criar);
router.get('/:id', obterPorId);
router.put('/:id', atualizar);
router.delete('/:id', deletar);

module.exports = router;
