const request = require('supertest')

const app = require('../../src/app')
const User = require('../../src/app/models/user')
const truncate = require('../utils/truncate')

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate('users');
    })

    it('should authenticate with valid credentials', async () => {
        await User.findOneAndRemove({ email: "george@gmail.com" });
        const user = await User.create({
            name: "George",
            lastName: "Mueller",
            email: "george@gmail.com",
            password: "123456"
        });

        const response = await request(app)
            .post('/api/v1/auth/authenticate')
            .send({
                email: "george@gmail.com",
                password: "123456"
            });

        expect(response.status).toBe(200);
        expect(response.body.token).not.toBeUndefined();
    })
})