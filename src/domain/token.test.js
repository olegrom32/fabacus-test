import Token from "./token.js";

test('Return proper status for available token', () => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate()+1);

  const token = new Token('test', expiresAt, false);
  expect(token.status()).toBe('available');
  expect(token.isAvailable()).toBe(true);
});

test('Return proper status for expired token', () => {
  const token = new Token('test', new Date(2022, 1), false);
  expect(token.status()).toBe('expired');
  expect(token.isAvailable()).toBe(false);
});

test('Return proper status for redeemed token', () => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate()+1);

  const token = new Token('test', expiresAt, true);
  expect(token.status()).toBe('redeemed');
  expect(token.isAvailable()).toBe(false);
});
