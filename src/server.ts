import https from 'https';
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { expressServerConfiguration } from './environment/configuration';
import { expressPostgreSQLDatabaseConnection } from './database/connection';

import { messenger } from './utilities/messenger';

import { api } from './endpoints/api';

export class ExpressServer {
  constructor() {
    this.startServer();
  }

  async startServer(): Promise<void> {
    const { url } = expressServerConfiguration.serverOptions;

    return Promise.all([this.checkDatabaseConnection(), this.checkAPI()])
      .then(() => {
        console.log(messenger.info(`Server started on ${url()}`).message);
      })
      .catch((error) => {
        console.log(
          messenger.warning<Error>(
            'Error starting the server. Please check all settings and try again.',
            error
          ).message
        );
      });
  }

  async checkAPI(): Promise<void> {
    const { SSLOptions, serverOptions, isDevelopmentMode } =
      expressServerConfiguration;
    const { port } = serverOptions;
    const app = express();

    app.use(cookieParser(), express.json());

    return new Promise((resolve, reject) => {
      if (isDevelopmentMode) {
        app.use(
          '/api',
          api,
          cors({
            credentials: true,
            origin: 'https://localhost:4200',
          })
        );

        app.listen(port);

        resolve();
      } else {
        app.use(
          '/api',
          api,
          express.static(path.resolve(__dirname, './public/index.html'))
        );

        app.get('*', function (request, response) {
          response.sendFile(path.resolve(__dirname, './public/index.html'));
        });

        https.createServer(SSLOptions, app).listen(port);

        resolve();
      }
    });
  }

  async checkDatabaseConnection(): Promise<void> {
    return expressPostgreSQLDatabaseConnection.connection
      .connect()
      .then(() => {
        const { message } = messenger.success(
          'Database connected successfully!'
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
