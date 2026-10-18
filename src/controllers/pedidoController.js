const pedidoService = require('../services/pedidoService');

class PedidoController {
  criar(req, res) {
    try {
      const novoPedido = pedidoService.criar(req.body);
      return res.status(201).json(novoPedido);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }

  listar(req, res) {
    try {
      const lista = pedidoService.listar();
      return res.status(200).json(lista);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  consultarPorId(req, res) {
    try {
      const pedido = pedidoService.consultarPorId(req.params.id);
      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }

  atualizarStatus(req, res) {
    try {
      const { status } = req.body;
      const pedidoAtualizado = pedidoService.atualizarStatus(req.params.id, status);
      return res.status(200).json(pedidoAtualizado);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }
}

module.exports = new PedidoController();