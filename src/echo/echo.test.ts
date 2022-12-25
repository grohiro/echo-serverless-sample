import * as echo from './echo';

describe('getOptions', () => {
  test('オプション未指定', () => {
    expect(echo.getOpts('')).toStrictEqual([]);
  });
  test('uppercase', () => {
    expect(echo.getOpts('uppercase')).toStrictEqual([echo.OPTION_UPPERCASE]);
  });
  test('オプション文字列の trim()', () => {
    expect(echo.getOpts('  uppercase ')).toStrictEqual([echo.OPTION_UPPERCASE]);
  });
});

describe('invoke', () => {
  test('echo', () => {
    expect(echo.invoke('Hello', [])).toBe('Hello');
  });

  test('echo with option uppercase', () => {
    expect(echo.invoke('Hello', [echo.OPTION_UPPERCASE])).toBe('HELLO');
  });
});
