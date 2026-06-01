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

    test('POST /usuarios retorna 400 para email duplicado', async () => {
        await request(app).post('/usuarios').send({ nome: 'Joao', email: 'igual@test.com', tipo: 'aluno' });
        const res = await request(app).post('/usuarios').send({ nome: 'Maria', email: 'igual@test.com', tipo: 'professor' });
        expect(res.status).toBe(400);
    });

    test('GET /usuarios lista todos os usuarios cadastrados', async () => {
        await request(app).post('/usuarios').send({ nome: 'Joao', email: 'joao@test.com', tipo: 'aluno' });
        await request(app).post('/usuarios').send({ nome: 'Maria', email: 'maria@test.com', tipo: 'professor' });

        const res = await request(app).get('/usuarios');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    test('PUT /usuarios/:id atualiza um usuario existente', async () => {
        const criado = await request(app).post('/usuarios').send({ nome: 'Joao', email: 'joao@test.com', tipo: 'aluno' });
        const res = await request(app).put(`/usuarios/${criado.body.id}`).send({ nome: 'Joao Atualizado' });
        expect(res.status).toBe(200);
        expect(res.body.nome).toBe('Joao Atualizado');
    });

    test('PUT /usuarios/:id retorna 404 para usuario inexistente', async () => {
        const res = await request(app).put('/usuarios/9999').send({ nome: 'Nenhum' });
        expect(res.status).toBe(404);
    });

    test('DELETE /usuarios/:id remove um usuario existente', async () => {
        const criado = await request(app).post('/usuarios').send({ nome: 'Temp', email: 'temp@test.com', tipo: 'aluno' });
        const res = await request(app).delete(`/usuarios/${criado.body.id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('mensagem');
    });

    test('DELETE /usuarios/:id retorna 404 para usuario inexistente', async () => {
        const res = await request(app).delete('/usuarios/9999');
        expect(res.status).toBe(404);
    });
});
