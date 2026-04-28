const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

beforeEach(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Usuarios', () => {
    test('POST /usuarios cria um usuario', async () => {
        const res = await request(app).post('/usuarios').send({
            nome: 'Joao Silva',
            email: 'joao@test.com',
            tipo: 'aluno',
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe('Joao Silva');
    });

    test('POST /usuarios retorna 400 quando campo obrigatorio esta ausente', async () => {
        const res = await request(app).post('/usuarios').send({
            email: 'joao@test.com',
            tipo: 'aluno',
        });
        expect(res.status).toBe(400);
    });

    test('GET /usuarios/:id retorna um usuario existente', async () => {
        const criado = await request(app).post('/usuarios').send({
            nome: 'Maria Souza',
            email: 'maria@test.com',
            tipo: 'professor',
        });
        const res = await request(app).get(`/usuarios/${criado.body.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(criado.body.id);
    });

    test('GET /usuarios/:id retorna 404 para usuario inexistente', async () => {
        const res = await request(app).get('/usuarios/9999');
        expect(res.status).toBe(404);
    });
});
