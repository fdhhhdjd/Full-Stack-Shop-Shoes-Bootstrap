const request = require('supertest');
const app = require("../../../../../app")
const mongoose = require("mongoose")
/**
     * @Author Nguyễn Tiến Tài
     * @Created_at 29/11/2022
     * @Description Unit test User API - Authentication
*/
describe("User_Api", () => {
    describe("Authentication - User - Login ", () => {
        it('POST /api/user/login - Success - Login Users', async () => {
            const { body, status } = await request(app).post('/api/user/login').send({
                email_phone: 'tai.nti.60cntt@ntu.edu.vn',
                password: 'Taiheo123@'
            }).expect('Content-Type', /json/)

            expect(status).toBe(200);

            expect(body).toEqual({
                status: expect.any(Number),
                success: expect.any(Boolean),
                message: expect.any(String),
                element: expect.any(Object)
            });
        });

        it('POST  /api/user/login - User Not Exits', async () => {
            const { body, status } = await request(app).post('/api/user/login').send({
                email_phone: 'tai.nti.60cntt@ntu.edu.vn1',
                password: 'Taiheo123@'
            }).expect('Content-Type', /json/)
            expect(status).toBe(305);
            expect(body).toEqual({
                status: expect.any(Number),
                success: expect.any(Boolean),
                message: expect.any(String)
            });

        });

        it('POST  /api/user/login - Phone Not Exits', async () => {
            const { body, status } = await request(app).post('/api/user/login').send({
                email_phone: '123456',
                password: 'Taiheo123@'
            }).expect('Content-Type', /json/)
            expect(status).toBe(306);
            expect(body).toEqual({
                status: expect.any(Number),
                success: expect.any(Boolean),
                message: expect.any(String)
            });

        });

        it('POST  /api/user/login - Wrong Password', async () => {
            const { body, status } = await request(app).post('/api/user/login').send({
                email_phone: 'tai.nti.60cntt@ntu.edu.vn',
                password: 'Taiheo123@1'
            }).expect('Content-Type', /json/)
            expect(status).toBe(403);

            expect(body).toEqual({
                status: expect.any(Number),
                success: expect.any(Boolean),
                message: expect.any(String)
            });

        });

    })
}, 30000);
afterAll(() => {
    mongoose.connection.close()
})