"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
dotenv_1.default.config();
(0, database_1.default)();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = new Set([
    process.env.USER_FRONTEND_URL,
    process.env.ADMIN_FRONTEND_URL,
]);
app.use((0, cors_1.default)({
    origin: (origin, callback) => callback(null, !origin || allowedOrigins.has(origin)),
    credentials: true,
}));
app.use("/api", routers_1.default);
app.use("/health", (_, res) => {
    res.send("Server is healthy");
});
app.listen(PORT, () => {
    console.log(`Server successfully running at port: ${PORT}`);
});
