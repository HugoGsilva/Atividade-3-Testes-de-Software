const { Router } = require('express');
const { listar, criar, obterPorId } = require('../controllers/livroController');

const router = Router();

router.get("/", listar);
router.post("/", criar);
router.get("/:id", obterPorId);

module.exports = router;
