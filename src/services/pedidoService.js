let pedidos = [];
let nextId = 1;

const TIPOS_VALIDOS = ['entrega', 'retirada'];
const PRIORIDADES_VALIDAS = ['baixa', 'normal', 'alta'];
const STATUS_VALIDOS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

const transicoesPermitidas = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'cancelado'],
  enviado: ['entregue'],
  entregue: [],
  cancelado: []
};

class PedidoService {
  criar(dados) {
    const { cliente, tipo, valor, prioridade } = dados;

    if (!cliente || typeof cliente !== 'string' || cliente.trim() === '') {
      const erro = new Error("O campo 'cliente' é obrigatório e não pode estar vazio.");
      erro.status = 400;
      throw erro;
    }

    if (valor === undefined || typeof valor !== 'number' || valor <= 0) {
      const erro = new Error("O campo 'valor' deve ser numérico e maior que zero.");
      erro.status = 400;
      throw erro;
    }

    if (!tipo || !TIPOS_VALIDOS.includes(tipo)) {
      const erro = new Error(`Tipo inválido. Tipos aceitos: ${TIPOS_VALIDOS.join(', ')}.`);
      erro.status = 400;
      throw erro;
    }

    if (!prioridade || !PRIORIDADES_VALIDAS.includes(prioridade)) {
      const erro = new Error(`Prioridade inválida. Prioridades aceitas: ${PRIORIDADES_VALIDAS.join(', ')}.`);
      erro.status = 400;
      throw erro;
    }

    const novoPedido = {
      id: nextId++,
      cliente: cliente.trim(),
      tipo,
      valor,
      prioridade,
      status: 'recebido'
    };

    pedidos.push(novoPedido);
    return novoPedido;
  }

  listar() {
    return pedidos;
  }

  consultarPorId(id) {
    const pedidoId = parseInt(id, 10);
    const pedido = pedidos.find(p => p.id === pedidoId);

    if (!pedido) {
      const erro = new Error("Pedido não encontrado.");
      erro.status = 404;
      throw erro;
    }

    return pedido;
  }

  atualizarStatus(id, novoStatus) {
    const pedido = this.consultarPorId(id);

    if (!novoStatus || !STATUS_VALIDOS.includes(novoStatus)) {
      const erro = new Error(`Status inválido. Status aceitos: ${STATUS_VALIDOS.join(', ')}.`);
      erro.status = 400;
      throw erro;
    }

    const statusAtual = pedido.status;
    const permitidos = transicoesPermitidas[statusAtual] || [];

    if (!permitidos.includes(novoStatus) && statusAtual !== novoStatus) {
      const erro = new Error(`Transição de status inválida de '${statusAtual}' para '${novoStatus}'.`);
      erro.status = 400;
      throw erro;
    }

    pedido.status = novoStatus;
    return pedido;
  }
}

module.exports = new PedidoService();