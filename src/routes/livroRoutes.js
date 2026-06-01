const { Router } = require('express');
const { listar, criar, obterPorId, atualizar, deletar } = require('../controllers/livroController');

const router = Router();

router.get("/", listar);
router.post("/", criar);
router.get("/:id", obterPorId);
router.put("/:id", atualizar);
router.delete("/:id", deletar);

module.exports = router;
