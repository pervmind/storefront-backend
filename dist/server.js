"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./handlers/user"));
const product_1 = __importDefault(require("./handlers/product"));
const order_1 = __importDefault(require("./handlers/order"));
const orderedProduct_1 = __importDefault(require("./handlers/orderedProduct"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
// added cors
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, user_1.default)(app);
(0, product_1.default)(app);
(0, order_1.default)(app);
(0, orderedProduct_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
