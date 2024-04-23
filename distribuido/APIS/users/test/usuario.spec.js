const request = require('supertest');
const Server = require('../models/server');
const server = new Server();

const token = "12345"
const datosprueba = {
    nombre:"daniel", 
    edad:"31"
}
const userId = 3;

describe('GET /api/users', () => {
    test('respuesta codigo 200', async () => {
        const response = await request(server.app).get('/api/users').send();
        expect(response.statusCode).toBe(200);
        // expect(response.headers['Content-Type']).toEqual(
        //     expect.stringContaining("json")
        // );
    });

    // test('respuesta json', async () => {
    //     const response = await request(server.app).get('/api/users').send();
    //     // expect(response.statusCode).toBe(200);
    //     expect(response.headers['Content-Type']).toEqual(
    //         expect.stringContaining("json")
    //     );
    // });
});

describe("post /api/users", () => {

    test("Crear usuario", async () => {
        return request(server.app)
        .post('/api/users')
        .set('Authorization', 'Bearer ' +token)
        .send(datosprueba)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(({body})=>{
            datosprueba.nombre=body.nombre;
            
        })
    });

    test("Se puede crear usuario", async () => {
        return request(server.app)
        .post('/api/users')
        .send(datosprueba)
        .expect(201)
    });
})


describe("put /api/users/:id", () => {

    test("Actualizacion usuario", async () => {
        return request(server.app)
        .put(`/api/users/${userId}`)
        .set('Authorization', 'Bearer ' +token)
        .send(datosprueba)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(({body})=>{
            console.log(body.id)
        })
    })
})

describe("Delete /api/users/:id", () => {

    test("Eliminacion usuario", async () => {
        return request(server.app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', 'Bearer ' +token)
        .expect(410)
    })
})