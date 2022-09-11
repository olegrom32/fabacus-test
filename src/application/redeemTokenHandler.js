export default class RedeemTokenHandler {
  constructor(tokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  async handle(value) {
    // TODO to properly handle concurrent updates/redemption of the same record we need to implement
    // a (distributed) locking mechanism. It is better use a fully-featured database in this case
    const token = await this.tokenRepository.findOne(value);

    if (!token.isAvailable()) {
      // Return 'processable' = false in case token has already been redeemed or expired
      return {token, processable: false};
    }

    // Update token and save it
    token.isRedeemed = true;

    await this.tokenRepository.save(token);

    return {token, processable: true};
  }
}
