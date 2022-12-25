import * as info from './info';

jest.useFakeTimers()
  .setSystemTime(new Date('2022-12-24T09:19:34+09:00')); // JST

describe('info module', () => {
  describe('invoke', () => {
    test('response', () => {
      const utcNow = new Date('2022-12-24T00:19:34.000Z');
      const res = info.invoke();
      expect(res).toBeTruthy();
      expect(res.now.toISOString()).toBe(utcNow.toISOString());
      expect(res.timestamp).toEqual(utcNow.getTime() / 1000);
    });
  });
});


