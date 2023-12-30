"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function dbConnection() {
    try {
        mongoose_1.default.set('strictQuery', true);
        mongoose_1.default.connect(process.env.MONGO_URL);
        console.clear();
        console.log('Base de datos Online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map