"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const database_1 = require("./database");
const scriptFile = 'src/config/init-database.sql';
fs_1.readFile(scriptFile, 'utf8', (err, data) => {
    if (err)
        throw err;
    database_1.sequelize.query(data).catch(err => console.log(err));
});
