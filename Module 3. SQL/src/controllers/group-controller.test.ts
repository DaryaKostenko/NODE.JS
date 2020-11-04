import request from 'supertest';
import { app, server } from '../app';
import { validate as uuidValidate, v4 as guid } from 'uuid';

describe('GroupController', () => {
    let authHeaderValue = '';
    const path = '/api/groups';
    const id = '6d63b0af-92c7-4a91-9373-dfaa02a61900';
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

    describe('getGroup', () => {
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

        it('get group successfully', async () => {
            const result: any = await request(app)
                .get(pathWithId)
                .set('Authorization', authHeaderValue);
            expect(result.statusCode).toEqual(200);
            expect(result.body.id).not.toBeUndefined();
            expect(result.body.name).not.toBeUndefined();
        });
    });

    describe('getGroups', () => {
        it('get groups successfully', async () => {
            const result: any = await request(app)
                .get(path)
                .set('Authorization', authHeaderValue);
            expect(result.statusCode).toEqual(200);
            expect(result.body.totalCount).toBeGreaterThan(0);
            expect(result.body.rows.length).toBeGreaterThan(0);
        });
    });

    describe('createGroup', () => {
        it('create group successfully', async () => {
            const result: any = await request(app)
                .post(path)
                .set('Authorization', authHeaderValue)
                .send({
                    name: `name${guid()}`,
                    permissions: ['READ', 'WRITE']
                });
            expect(result.statusCode).toEqual(200);
            expect(uuidValidate(result.body)).toBeTruthy();
        });
    });

    describe('updateGroup', () => {
        it('update group successfully', async () => {
            const result: any = await request(app)
                .put(pathWithId)
                .set('Authorization', authHeaderValue)
                .send({
                    name: `name${guid()}`,
                    permissions: ['READ', 'WRITE']
                });
            expect(result.statusCode).toEqual(200);
            expect(uuidValidate(result.body)).toBeTruthy();
        });
    });

    describe('deleteGroup', () => {
        it('delete group successfully', async () => {
            //Arrange
            const createGroupResult: any = await request(app)
                .post(path)
                .set('Authorization', authHeaderValue)
                .send({
                    name: `name${guid()}`,
                    permissions: ['WRITE']
                });

            const result: any = await request(app)
                .delete(`${path} / ${createGroupResult.body}`)
                .set('Authorization', authHeaderValue);
            expect(result.statusCode).toEqual(200);
        });
    });
});
