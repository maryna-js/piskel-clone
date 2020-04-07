const getBoundingClientRect = require('./utils');

test('adds 1 + 2 to equal 3', () => {
  expect(getBoundingClientRect(canvas)).toBe(3);
});
