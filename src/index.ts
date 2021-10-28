import chalk from 'chalk';

import { SERVER_OPTIONS } from './environment';
import { client } from './database';

function startServer() {
  const INFO = `${chalk.blueBright.bold('[INFO]')} ${chalk(
    'Server started on'
  )} ${chalk.green.bold(`${SERVER_OPTIONS.url()}`)}`;

  console.log(INFO);
  client
    .connect()
    .then(() => {
      console.log('Database connected!');
    })
    .catch((error) => {
      console.error('Database connectione failed!', error);
    });
}

startServer();
