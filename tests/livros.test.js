const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

beforeEach(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Livros', () => {
    test('GET /livros lista todos os livros cadastrados', async () => {
        await request(app).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code' });
        await request(app).post('/livros').send({ titulo: 'Refactoring', autor: 'Martin Fowler' });

        const res = await request(app).get('/livros');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            expect.objectContaining({ titulo: 'Clean Code', autor: 'Martin Code' }),
            expect.objectContaining({ titulo: 'Refactoring', autor: 'Martin Fowler' }),
        ]);
    });

    test('OPTIONS /livros permite requisicoes CORS do frontend', async () => {
        const res = await request(app).options('/livros');

        expect(res.status).toBe(204);
        expect(res.headers['access-control-allow-origin']).toBe('*');
        expect(res.headers['access-control-allow-methods']).toContain('GET');
        expect(res.headers['access-control-allow-methods']).toContain('POST');
    });

    test('POST /livros cria um livro', async () => {
        const res = await request(app).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code'});
        expect(res.status).toBe(201);
        expect(res.body.titulo).toBe('Clean Code');
    });

    test('POST /livros retorna 400 quando campo obrigatorio esta ausente', async () => {
        const res = await request(app).post('/livros').send({ titulo: 'Clean Code' });
        expect(res.status).toBe(400);
    });

    test('GET /livros/:id retorna um livro existente', async () => {
        const criado = await request(app).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code' });
        const res = await request(app).get(`/livros/${criado.body.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(criado.body.id);
    });

    test('GET /livros/:id retorna 404 para livro inexistente', async () => {
        const res = await request(app).get('/livros/9999');
        expect(res.status).toBe(404);
    });

    test('POST /livros retorna o livro criado com id, titulo e autor', async () => {
        const res = await request(app).post('/livros').send({ titulo: 'Refactoring', autor: 'Martin Fowler' });
        expect(res.body).toHaveProperty('id');
        expect(res.body.titulo).toBe('Refactoring');
        expect(res.body.autor).toBe('Martin Fowler');
    });

    test('PUT /livros/:id atualiza um livro existente', async () => {
        const criado = await request(app).post('/livros').send({ titulo: 'Titulo Original', autor: 'Autor Original' });
        const res = await request(app).put(`/livros/${criado.body.id}`).send({ titulo: 'Titulo Atualizado' });
        expect(res.status).toBe(200);
        expect(res.body.titulo).toBe('Titulo Atualizado');
        expect(res.body.autor).toBe('Autor Original');
    });

    test('PUT /livros/:id retorna 404 para livro inexistente', async () => {
        const res = await request(app).put('/livros/9999').send({ titulo: 'Nenhum' });
        expect(res.status).toBe(404);
    });

    test('DELETE /livros/:id remove um livro existente', async () => {
        const criado = await request(app).post('/livros').send({ titulo: 'Livro Temp', autor: 'Autor Temp' });
        const res = await request(app).delete(`/livros/${criado.body.id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('mensagem');
    });

    test('DELETE /livros/:id retorna 404 para livro inexistente', async () => {
        const res = await request(app).delete('/livros/9999');
        expect(res.status).toBe(404);
    });
});
