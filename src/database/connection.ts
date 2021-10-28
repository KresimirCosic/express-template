import { Client } from 'pg';

import {
  DATABASE_USER,
  DATABASE_USER_PASSWORD,
  DATABASE_NAME,
} from '../environment';

export const client = new Client({
  user: DATABASE_USER,
  password: DATABASE_USER_PASSWORD,
  database: DATABASE_NAME,
});
