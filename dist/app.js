"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// Example usage:
const app = (0, express_1.default)();
// 設定 CORS 允許來自前端的請求
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
