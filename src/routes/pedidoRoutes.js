const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/pedidos', (req, res) => pedidoController.criar(req, res));
router.get('/pedidos', (req, res) => pedidoController.listar(req, res));
router.get('/pedidos/:id', (req, res) => pedidoController.consultarPorId(req, res));
router.patch('/pedidos/:id/status', (req, res) => pedidoController.atualizarStatus(req, res));

module.exports = router;