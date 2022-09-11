import RandomTokenGenerator from "./randomTokenGenerator.js";

test('Return token', () => {
  const token = new RandomTokenGenerator().generate();
  expect(token).toHaveLength(8);
});
