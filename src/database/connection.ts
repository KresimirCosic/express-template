import { Client } from 'pg';

import { expressServerConfiguration } from '../environment';

export class ExpressPostgreSQLDatabaseConnection {
  private _connection: Client;

  constructor() {
    this._connection = this.setupConnection();
  }

  setupConnection(): Client {
    const { DATABASE_USER, DATABASE_USER_PASSWORD, DATABASE_NAME } =
      expressServerConfiguration.processEnvironmentVariables;

    return new Client({
      user: DATABASE_USER,
      password: DATABASE_USER_PASSWORD,
      database: DATABASE_NAME,
    });
  }

  get connection(): Client {
    return this._connection;
  }
}
