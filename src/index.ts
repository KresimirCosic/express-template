import https from 'https';
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { expressServerConfiguration } from './environment/configuration';
import {
  ExpressPostgreSQLDatabaseConnection,
  expressPostgreSQLDatabaseConnection,
} from './database/connection';

import { messenger } from './utilities/messenger';

import { api } from './endpoints/api';
import { dirname } from 'path/posix';

class ExpressServer {
  constructor() {
    this.startServer();
  }

  async startServer(): Promise<void> {
    const { isDevelopmentMode, SSLOptions } = expressServerConfiguration;
    const { port, url } = expressServerConfiguration.serverOptions;
    const app = express();

    if (isDevelopmentMode) {
      app.use(
        cors({
          credentials: true,
          origin: 'https://localhost:4200',
        })
      );

      app.listen(port, function () {
        console.clear();
      });

      app.use('/api', api);
    } else if (!isDevelopmentMode) {
      app.use('/api', api);

      app.use(express.static(path.resolve(__dirname, './public/index.html')));

      app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, './public/index.html'));
      });

      https.createServer(SSLOptions, app).listen(port);
    }

    await this.connectToDatabase();
    console.log(messenger.info(`Server started on ${url()}`).message);
  }

  async connectToDatabase(): Promise<void> {
    return expressPostgreSQLDatabaseConnection.connection
      .connect()
      .then(() => {
        const { message } = messenger.success(
          'Database connected successfully'
        );
        console.log(message);
      })
      .catch((error: Error) => {
        const { message, payload } = messenger.warning<Error>(
          error.message,
          error
        );
        console.error(message, payload);
      });
  }
}

const expressServer: ExpressServer = new ExpressServer();
