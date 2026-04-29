const request = require('supertest');
const app = require('../src/app');
const { sequelize, Livro, Usuario } = require('../src/models');

beforeEach(async () => {
    await sequelize.sync({ force: true });
    await Livro.create({ titulo: 'Livro Teste', autor: 'Autor Teste' });
    await Usuario.create({ nome: 'Teste', email: 'teste@test.com', tipo: 'aluno' });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Emprestimos', () => {
    test('POST /emprestimos cria um emprestimo', async () => {
        const res = await request(app).post('/emprestimos').send({
            livro_id: 1,
            usuario_id: 1,
            data_emprestimo: '2026-04-01',
            status: 'ativo',
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    test('POST /emprestimos retorna 400 quando campo obrigatorio esta ausente', async () => {
        const res = await request(app).post('/emprestimos').send({
            usuario_id: 1,
            data_emprestimo: '2026-04-01',
        });
        expect(res.status).toBe(400);
    });

    test('GET /emprestimos/:id retorna um emprestimo existente', async () => {
        const criado = await request(app).post('/emprestimos').send({
            livro_id: 1,
            usuario_id: 1,
            data_emprestimo: '2026-04-01',
            status: 'ativo',
        });
        const res = await request(app).get(`/emprestimos/${criado.body.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(criado.body.id);
    });

    test('GET /emprestimos/:id retorna 404 para emprestimo inexistente', async () => {
        const res = await request(app).get('/emprestimos/9999');
        expect(res.status).toBe(404);
    });

    test('POST /emprestimos retorna emprestimo com livro_id, usuario_id e status', async () => {
        const res = await request(app).post('/emprestimos').send({
            livro_id: 1,
            usuario_id: 1,
            data_emprestimo: '2026-04-01',
            status: 'ativo',
        });
        expect(res.body.livro_id).toBe(1);
        expect(res.body.usuario_id).toBe(1);
        expect(res.body.status).toBe('ativo');
    });
});
