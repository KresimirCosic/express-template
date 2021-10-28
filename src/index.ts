import chalk from 'chalk';

import { expressServerConfiguration } from './environment';
import { ExpressPostgreSQLDatabaseConnection } from './database';

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
    const INFO = `${chalk.cyan('[INFO]')} ${chalk(
      'Server started on'
    )} ${chalk.green.bold(
      `${expressServerConfiguration.serverOptions.url()}`
    )}`;

    console.log(INFO);

    this.database.connection.connect((error) => {
      if (error) {
        console.error(
          `${chalk.red('[ERROR]')} ${
            error.message[0].toLocaleUpperCase() +
            error.message.split('').splice(1).join('')
          }`
        );
      } else {
        console.log(
          `${chalk.green('[INFO]')} Database connected successfully!`
        );
      }
    });
  }
}

const expressServer = new ExpressServer();
