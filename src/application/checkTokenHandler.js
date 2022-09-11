export default class CheckTokenHandler {
  constructor(tokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  async handle(value) {
    // Simply return token (repo will throw error if token is not found)
    return await this.tokenRepository.findOne(value);
  }
}
