import crypto from "crypto";

export default class RandomTokenGenerator {
  generate() {
    // Generate random string
    // TODO parametrize length of token, pass via env
    return crypto.randomBytes(4).toString('hex');
  }
}
