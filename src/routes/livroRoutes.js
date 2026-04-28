const { Router } = require('express');
const { criar, obterPorId } = require('../controllers/livroController');

const router = Router();

router.post("/", criar);
router.get("/:id", obterPorId);

module.exports = router;