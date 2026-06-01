const { Router } = require('express');
const { criar, obterPorId, listar, atualizar, quitar, deletar } = require('../controllers/multaController');

const router = Router();

router.get('/', listar);
router.post('/', criar);
router.get('/:id', obterPorId);
router.put('/quitar/:id', quitar);
router.put('/:id', atualizar);
router.delete('/:id', deletar);

module.exports = router;
