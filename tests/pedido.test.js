const request = require('supertest');
const app = require('../src/index');

describe('Testes da API de Gerenciamento de Pedidos', () => {
  let pedidoId;

  it('Deve criar um novo pedido com sucesso (HTTP 201)', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({
        cliente: "Carlos Silva",
        tipo: "entrega",
        valor: 350,
        prioridade: "normal"
      });

    expect(resposta.statusCode).toEqual(201);
    expect(resposta.body).toHaveProperty('id');
    expect(resposta.body.cliente).toEqual("Carlos Silva");
    expect(resposta.body.status).toEqual("recebido");
    
    pedidoId = resposta.body.id;
  });

  it('Não deve criar um pedido com dados inválidos/cliente vazio (HTTP 400)', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({
        cliente: "",
        tipo: "entrega",
        valor: 350,
        prioridade: "normal"
      });

    expect(resposta.statusCode).toEqual(400);
    expect(resposta.body).toHaveProperty('erro');
  });

  it('Deve listar todos os pedidos cadastrados (HTTP 200)', async () => {
    const resposta = await request(app).get('/pedidos');

    expect(resposta.statusCode).toEqual(200);
    expect(Array.isArray(resposta.body)).toBeTruthy();
    expect(resposta.body.length).toBeGreaterThan(0);
  });

  it('Deve consultar um pedido existente pelo ID (HTTP 200)', async () => {
    const resposta = await request(app).get(`/pedidos/${pedidoId}`);

    expect(resposta.statusCode).toEqual(200);
    expect(resposta.body.id).toEqual(pedidoId);
  });

  it('Deve retornar 404 ao consultar um ID inexistente', async () => {
    const resposta = await request(app).get('/pedidos/9999');

    expect(resposta.statusCode).toEqual(404);
  });

  it('Deve atualizar o status de um pedido com sucesso (HTTP 200)', async () => {
    const resposta = await request(app)
      .patch(`/pedidos/${pedidoId}/status`)
      .send({ status: "em_preparacao" });

    expect(resposta.statusCode).toEqual(200);
    expect(resposta.body.status).toEqual("em_preparacao");
  });
});