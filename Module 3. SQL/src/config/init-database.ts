import { readFile } from 'fs';
import { sequelize } from "./database";

const scriptFile = 'src/config/init-database.sql';

readFile(scriptFile,'utf8', (err, data) => {
    if (err) throw err;
    sequelize.query(data).catch(err => console.log(err));
});

  