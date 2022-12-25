import * as time from './time';

describe('invoke', () => {
  test('time', () => {
    expect(time.invoke()).not.toBe('');
    expect(time.invoke()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
