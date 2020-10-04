import express, { Application } from 'express';

import { InitDatabase } from './config/database';
import { InitRouters } from './routers/router';

const port = 3000;
const app: Application = express();

InitDatabase();
InitRouters(app);

app.listen(port, function () {
    console.log(`App is listening on port ${port}!`);
});
