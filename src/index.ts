import { expressServerConfiguration } from './environment/configuration';
import { ExpressPostgreSQLDatabaseConnection } from './database';

import { messenger } from './utilities/messenger';

class ExpressServer {
  private _connection: ExpressPostgreSQLDatabaseConnection;

  get database(): ExpressPostgreSQLDatabaseConnection {
    return this._connection;
  }

  constructor() {
    this._connection = new ExpressPostgreSQLDatabaseConnection();

    this.startServer();
  }

  startServer() {
    const { url } = expressServerConfiguration.serverOptions;

    console.log(messenger.info(`Server started on ${url()}`).message);

    this.database.connection.connect((error) => {
      if (error) {
        const { message, payload } = messenger.warning<Error>(
          error.message,
          error
        );
        console.error(message, payload);
      } else {
        const { message } = messenger.success(
          'Database connected successfully!'
        );
        console.log(message);
      }
    });
  }
}

const expressServer: ExpressServer = new ExpressServer();
