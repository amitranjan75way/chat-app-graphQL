import express, { type Express, type Request, type Response, Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cookieParser from "cookie-parser"
import cors from 'cors';

import { initDB } from "./app/common/services/database.service";
import { initPassport } from "./app/common/services/passport-jwt.service";
import { loadConfig } from "./app/common/helper/config.hepler";
import { type IUser } from "./app/user/user.dto";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import apiLimiter from './app/common/middleware/rate-limit.middleware';

import { ApolloServer } from 'apollo-server-express';
import typeDefs from './app/graphql/schema';  
import resolvers from './app/graphql/resolvers';  
loadConfig();

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> { }
    interface Request {
      user?: User;
    }
  }
}

const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow specific origins
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (e.g., cookies)
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Initialize Apollo Server for GraphQL
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const initApp = async (): Promise<void> => {
  // init mongodb
  await initDB();

  // passport init
  initPassport();

  // set base path to /api
  app.use("/api", apiLimiter, routes);

  app.get("/", apiLimiter, (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });

  // Apply GraphQL middleware at /graphql endpoint
  await apolloServer.start();

  // Cast app to the correct Application type for ApolloServer
  (apolloServer as any).applyMiddleware({ app: app as Application });
  
  // error handler
  app.use(errorHandler);

  http.createServer(app).listen(port, () => {
    console.log("Server is running on port: ", port);
    console.log(`GraphQL endpoint at http://localhost:${port}/graphql`);
  });
};

void initApp();