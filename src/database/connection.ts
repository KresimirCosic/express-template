import { Client } from 'pg';

import { expressServerConfiguration } from '../environment/configuration';

export class ExpressPostgreSQLDatabaseConnection {
  private _connection: Client;

  constructor() {
    const { DATABASE_USER, DATABASE_USER_PASSWORD, DATABASE_NAME } =
      expressServerConfiguration.processEnvironmentVariables;

    this._connection = new Client({
      user: DATABASE_USER,
      password: DATABASE_USER_PASSWORD,
      database: DATABASE_NAME,
    });
  }

  get connection(): Client {
    return this._connection;
  }
}

export const expressPostgreSQLDatabaseConnection: ExpressPostgreSQLDatabaseConnection =
  new ExpressPostgreSQLDatabaseConnection();
