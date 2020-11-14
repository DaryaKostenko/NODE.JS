/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Client } = require('pg');
const { readFileSync } = require('fs');

const sql = (fileName) => readFileSync(fileName, 'utf-8');

module.exports = async () => {
    console.log('\r\n Starting initializing of database for testing');

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'users',
        password: 'onelife111'
    });

    await client.connect();

    await client.query(sql('./src/config/init-database.sql'));

    await client.end();


    console.log(' Database was initialized for testing');
};