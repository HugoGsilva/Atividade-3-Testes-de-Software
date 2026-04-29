const request = require('supertest');
const app = require('../src/app');
const { sequelize, Livro, Usuario, Emprestimo } = require('../src/models');

beforeEach(async () => {
    await sequelize.sync({ force: true });
    const usuario = await Usuario.create({ nome: 'Teste', email: 'teste@test.com', tipo: 'aluno' });
    const livro = await Livro.create({ titulo: 'Livro Teste', autor: 'Autor Teste' });
    await Emprestimo.create({ livro_id: livro.id, usuario_id: usuario.id, data_emprestimo: '2026-04-01', status: 'ativo' });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Multas', () => {
    test('POST /multas cria uma multa', async () => {
        const res = await request(app).post('/multas').send({
            emprestimo_id: 1,
            valor: 10.50,
            data_multa: '2026-04-10',
            paga: false,
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    test('POST /multas retorna 400 quando campo obrigatorio esta ausente', async () => {
        const res = await request(app).post('/multas').send({
            valor: 10.50,
            data_multa: '2026-04-10',
        });
        expect(res.status).toBe(400);
    });

    test('GET /multas/:id retorna uma multa existente', async () => {
        const criado = await request(app).post('/multas').send({
            emprestimo_id: 1,
            valor: 10.50,
            data_multa: '2026-04-10',
            paga: false,
        });
        const res = await request(app).get(`/multas/${criado.body.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(criado.body.id);
    });

    test('GET /multas/:id retorna 404 para multa inexistente', async () => {
        const res = await request(app).get('/multas/9999');
        expect(res.status).toBe(404);
    });

    test('POST /multas retorna o valor da multa como numero', async () => {
        const res = await request(app).post('/multas').send({
            emprestimo_id: 1,
            valor: 15.75,
            data_multa: '2026-04-10',
            paga: false,
        });
        expect(typeof res.body.valor).toBe('number');
        expect(res.body.valor).toBe(15.75);
    });
});
