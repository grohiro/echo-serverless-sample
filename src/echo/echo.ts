export const OPTION_UPPERCASE = 'uppercase';

export function getOpts(strOptions: string): string[]
{
  const values = strOptions.split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .values();

  const options = new Set(values).values();
  return [...options];
};

export function invoke(body: string, options: string[]): string {

  let query = body;

  if (options.includes(OPTION_UPPERCASE)) {
    query = query.toUpperCase();
  }

  return query;
};
