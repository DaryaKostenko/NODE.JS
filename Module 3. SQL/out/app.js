"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const inversify_config_1 = require("./config/inversify.config");
const inversify_types_1 = require("./config/inversify.types");
const port = 3000;
const app = express_1.default();
const routerConfig = inversify_config_1.container.get(inversify_types_1.TYPES.RouterConfig);
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use((err: any, req: Request, res: Response) => {
// if(err && err.error && err.error.isJoi) {
//     res.status(400).json({
//     type: err.type,
//     message: err.error.toString()
//     });
// }
// res.status(500).send(err);
// });
database_1.InitDatabase();
routerConfig.initRoutes(app);
app.listen(port, function () {
    console.log(`App is listening on port ${port}!`);
});
