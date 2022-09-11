import Token from "../domain/token.js";

// TODO pass via process.ENV
const validDays = 10;

export default class GenerateTokenHandler {
  constructor(tokenGenerator, tokenRepository) {
    // Token generator implementation can be easily switched from "random non-sequential" to any other
    // without having to change in business logic code
    this.tokenGenerator = tokenGenerator;

    // Token repository implementation can be easily switched for redis to any other
    this.tokenRepository = tokenRepository;
  }

  async handle(n) {
    const res = [];
    const now = new Date();
    // Calculate expiration date
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + validDays);

    // Generate n tokens
    for (let i = 0; i < n; i++) {
      const value = this.tokenGenerator.generate();

      // Save to repository
      await this.tokenRepository.save(new Token(value, expiresAt, false));

      res.push(value);
    }

    return {createdAt: now, tokens: res};
  }
}
