import request from 'supertest';
import { validate as uuidValidate, v4 as guid } from 'uuid';
import { app, server } from '../app';

describe('UserController', () => {
    let authHeaderValue = '';
    const path = '/api/users';
    const id = '7e2d737a-3596-4b90-9d3d-35f9f9028174';
    const pathWithId = `${path}/${id}`;
    const getToken = async () => {
        const result = await request(app)
            .post('/api/auth')
            .send({
                'login': 'user1',
                'password': 'password1'
            });
        return result.body.accessToken;
    }

    beforeAll(async () => {
        const token = await getToken();
        authHeaderValue = `Bearer ${token}`;
    });

    afterEach(() => {
        server.close();
    })

    describe('getUser', () => {
        it('empty request', async () => {
            const result: any = await request(app)
                .get(pathWithId);
            expect(result.statusCode).toEqual(401);
            expect(result.text).toEqual('No token provided.');
        });
        it('Bad token', async () => {
            const result: any = await request(app)
                .get(pathWithId)
                .set('Authorization', authHeaderValue + '123');
            expect(result.statusCode).toEqual(500);
            expect(result.text).toEqual('invalid signature');
        });

        it('get user successfully', async () => {
            const result: any = await request(app)
                .get(pathWithId)
                .set('Authorization', authHeaderValue);
            expect(result.statusCode).toEqual(200);
            expect(result.body.id).not.toBeUndefined();
            expect(result.body.login).not.toBeUndefined();
        });
    });

    describe('getUsers', () => {
        it('get users successfully', async () => {
            const result: any = await request(app)
                .get(path)
                .set('Authorization', authHeaderValue);
            expect(result.statusCode).toEqual(200);
            expect(result.body.totalCount).toBeGreaterThan(0);
            expect(result.body.rows.length).toBeGreaterThan(0);
        });
    });

    describe('createUser', () => {
        it('create user successfully', async () => {
            const result: any = await request(app)
                .post(path)
                .set('Authorization', authHeaderValue)
                .send({
                    login: `login${guid()}`,
                    password: `password${guid()}`,
                    age: 23
                });
            expect(result.statusCode).toEqual(200);
            expect(uuidValidate(result.body)).toBeTruthy();
        });
    });

    describe('updateUser', () => {
        it('update user successfully', async () => {
            const result: any = await request(app)
                .put(pathWithId)
                .set('Authorization', authHeaderValue)
                .send({
                    login: `login${guid()}`,
                    password: `password${guid()}`,
                    age: 27
                });
            expect(result.statusCode).toEqual(200);
            expect(uuidValidate(result.body)).toBeTruthy();
        });
    });

    describe('deleteUser', () => {
        it('delete user successfully', async () => {
            //Arrange
            const createUserResult: any = await request(app)
                .post(path)
                .set('Authorization', authHeaderValue)
                .send({
                    login: `login${guid()}`,
                    password: `password${guid()}`,
                    age: 23
                });

            const result: any = await request(app)
                .delete(`${path}/${createUserResult.body}`)
                .set('Authorization', authHeaderValue);
            expect(result.statusCode).toEqual(200);
        });
    });
});