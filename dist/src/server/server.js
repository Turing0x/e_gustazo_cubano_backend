"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const index_routes_1 = require("../routes/index.routes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        // Conectar la base de datos
        this.conectDB();
        // Middlewares
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(process.env.PORT, () => { console.log('Servidor corriendo en el puerto', process.env.PORT); });
    }
    conectDB() { (0, config_1.dbConnection)(); }
    middlewares() {
        this.app.use((0, cors_1.default)());
        // Lectura y parseo a formato JSON del body
        this.app.use(express_1.default.json());
        // Ruta publica para ver el html
        this.app.use(express_1.default.static('src/public'));
    }
    routes() { this.app.use(process.env.ROUTES_PREFIX, index_routes_1.api); }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map