import Token from "../../domain/token.js";
import {TokenNotFoundError} from "../../application/error.js";

export default class TokenRepositoryRedis {
  constructor(redis) {
    this.redis = redis;
  }

  async findOne(key) {
    // Find token in Redis
    const str = await this.redis.get(key);
    if (!str) {
      throw TokenNotFoundError;
    }

    // Deserialize token and return model
    const obj = JSON.parse(str);

    return new Token(obj.value, new Date(obj.expiresAt), obj.isRedeemed);
  }

  async save(token) {
    // Serialize domain model and save in Redis
    // TODO do not directly serialize domain entities as representation in DB and in business logic
    // may be different, decouple them
    await this.redis.set(token.value, JSON.stringify(token));
  }
}
