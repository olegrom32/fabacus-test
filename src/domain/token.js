// Domain model
export default class Token {
  constructor(value, expiresAt, isRedeemed) {
    this.value = value;
    this.expiresAt = expiresAt;
    this.isRedeemed = isRedeemed;
  }

  status() {
    // The business logic for token status was not present in the task description, just assuming redeemed tokens
    // must return 'redeemed' status regardless of the expiration date
    if (this.isRedeemed) {
      return 'redeemed'
    }

    if (this.isExpired()) {
      return 'expired';
    }

    return 'available';
  }

  // Bake these business rules into the domain model, do not leak to the outer code
  isAvailable() {
    return !this.isRedeemed && !this.isExpired();
  }

  isExpired() {
    return new Date() > this.expiresAt;
  }
}
