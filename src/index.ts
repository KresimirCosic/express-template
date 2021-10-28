import chalk from 'chalk';

import { SERVER_OPTIONS } from './environment';

function startServer() {
  const INFO = `${chalk.blueBright.bold('[INFO]')} ${chalk(
    'Server started on'
  )} ${chalk.green.bold(`${SERVER_OPTIONS.url()}`)}`;

  console.log(INFO);
}

startServer();
