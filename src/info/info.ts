import dayjs from 'dayjs';
import { env } from 'process';

export type InfoResponse = {
  event: any,
  context: any,
  now: Date;
  timestamp: number;
  timezone: string;
  environments: {[key: string]: string};
};

export function invoke(event: any, context: any): InfoResponse
{
  const now = dayjs();

  const environments: {[key: string]: string} = {};
  Object.keys(env).forEach((key: string) => environments[key] = env[key] || '');

  const res: InfoResponse = {
    event,
    context,
    now: now.toDate(),
    timestamp: now.unix(),
    timezone: process.env.TZ || 'UTC',
    environments,
  };

  return res;
}

