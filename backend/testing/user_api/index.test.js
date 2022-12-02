require('../env').beforeAll();
const request = require('supertest');
const app = require('../../app')
const path = require('path');
const directoryName = path.basename(__dirname);
const testingData = require('../data');

describe(`${directoryName}`, () => {
    var context;
    var TESTING_DATA;
    var Headers = {
        "Content-Type": "application/json"
    };

    beforeAll(async function() {
        TESTING_DATA = await testingData.setupData(directoryName);
    });

    beforeEach(function() {
        jest.isolateModules(() => {
            context = require('../context');
        });
    });

    afterEach(function() {
        jest.restoreAllMocks();
    });

    test('POST /api/user/login - Success - Login Users', async () => {
        const req = TESTING_DATA.success_params;
        const { email_phone, password } = req.params
        const { body, status } = await request(app).post(`${req.route}`).send({
            email_phone: email_phone,
            password: password
        }).set(Headers)
        expect(status).toBe(200);

        expect(body).toEqual({
            status: expect.any(Number),
            success: expect.any(Boolean),
            message: expect.any(String),
            element: expect.any(Object)
        });
    });

    test('POST  /api/user/login - User Not Exits', async () => {
        const req = TESTING_DATA.error_params;
        const { email_phone, password } = req.params.user_not_exit
        const { body, status } = await request(app).post(`${req.route}`).send({
            email_phone: email_phone,
            password: password
        }).set(Headers)
        expect(status).toBe(305);
        expect(body).toEqual({
            status: expect.any(Number),
            success: expect.any(Boolean),
            message: expect.any(String)
        });

    });

    test('POST  /api/user/login - Phone Not Exits', async () => {
        const req = TESTING_DATA.error_params;
        const { email_phone, password } = req.params.phone_not_exit
        const { body, status } = await request(app).post(`${req.route}`).send({
            email_phone: email_phone,
            password: password
        }).set(Headers)
        expect(status).toBe(306);
        expect(body).toEqual({
            status: expect.any(Number),
            success: expect.any(Boolean),
            message: expect.any(String)
        });

    });

    test('POST  /api/user/login - Wrong Password', async () => {
        const req = TESTING_DATA.error_params;
        const { email_phone, password } = req.params.wrong_password
        const { body, status } = await request(app).post(`${req.route}`).send({
            email_phone: email_phone,
            password: password
        }).set(Headers)
        expect(status).toBe(403);

        expect(body).toEqual({
            status: expect.any(Number),
            success: expect.any(Boolean),
            message: expect.any(String)
        });

    });
});