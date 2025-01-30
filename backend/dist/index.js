"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const database_service_1 = require("./app/common/services/database.service");
const passport_jwt_service_1 = require("./app/common/services/passport-jwt.service");
const config_hepler_1 = require("./app/common/helper/config.hepler");
const error_handler_middleware_1 = __importDefault(require("./app/common/middleware/error-handler.middleware"));
const routes_1 = __importDefault(require("./app/routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const rate_limit_middleware_1 = __importDefault(require("./app/common/middleware/rate-limit.middleware"));
// GraphQL Setup (Schema and Resolvers)
const schema_1 = require("./app/graphql/schema");
const resolvers_1 = require("./app/graphql/resolvers");
(0, config_hepler_1.loadConfig)();
const port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 5000;
const app = (0, express_1.default)();
// Middleware setup
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));
const swagger_1 = __importDefault(require("./app/swagger/swagger"));
// Initialize Apollo Server
const pubsub = new graphql_subscriptions_1.PubSub();
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    subscriptions: {
        path: "/subscriptions",
    },
});
// GraphQL route setup
const initApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize database
    yield (0, database_service_1.initDB)();
    // Passport initialization
    (0, passport_jwt_service_1.initPassport)();
    // Set up Apollo Server to handle GraphQL requests
    yield server.start();
    server.applyMiddleware({ app, path: "/graphql" });
    // Set base path to /api for your existing RESTful routes
    app.use("/api", rate_limit_middleware_1.default, routes_1.default);
    // Set up Swagger UI
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
    // Default route
    app.get("/", (req, res) => {
        res.send(`<h1>Chat app is Running</h1>`);
    });
    // Error handler middleware
    app.use(error_handler_middleware_1.default);
    // Start the server
    http_1.default.createServer(app).listen(port, () => {
        console.log("Server is running on port", port);
        console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
        console.log(`GraphQL available at http://localhost:${port}/graphql`);
    });
});
void initApp();
