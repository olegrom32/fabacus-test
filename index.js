import express from "express";
import RandomTokenGenerator from "./src/infrastructure/adapter/randomTokenGenerator.js";
import {createClient} from "redis";
import TokenRepositoryRedis from "./src/infrastructure/repository/tokenRepositoryRedis.js";
import GenerateTokenHandler from "./src/application/generateTokenHandler.js";
import Controller from "./src/ui/controller.js";
import CheckTokenHandler from "./src/application/checkTokenHandler.js";
import RedeemTokenHandler from "./src/application/redeemTokenHandler.js";

const port = 3000;
const app = express();

// Init and wire dependencies
// We can easily switch to different implementations of token generator and repository
const tokenGenerator = new RandomTokenGenerator();
const redisClient = createClient({url: 'redis://redis:6379'});
await redisClient.connect();
const tokenRepository = new TokenRepositoryRedis(redisClient);
const generateTokenHandler = new GenerateTokenHandler(tokenGenerator, tokenRepository);
const checkTokenHandler = new CheckTokenHandler(tokenRepository);
const redeemTokenHandler = new RedeemTokenHandler(tokenRepository);
const controller = new Controller(generateTokenHandler, checkTokenHandler, redeemTokenHandler);

// Router configuration
app.post('/generate', controller.generateTokens.bind(controller));
app.get('/check/:token', controller.checkToken.bind(controller));
app.put('/redeem/:token', controller.redeemToken.bind(controller))

// Run app
app.listen(port, '0.0.0.0', () => {
    console.log(`Server started at http://0.0.0.0:${port}`);
  }
);
