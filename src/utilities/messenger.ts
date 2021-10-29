import chalk from 'chalk';

class Messenger {
  constructor() {}

  info<T = undefined>(message: string, payload?: T) {
    if (payload) {
      return {
        message: `${chalk.cyan('[INFO]')} ${chalk(message)}`,
        payload,
      };
    } else return { message: `${chalk.cyan('[INFO]')} ${chalk(message)}` };
  }

  success<T = undefined>(message: string, payload?: T) {
    if (payload) {
      return {
        message: `${chalk.green('[SUCCESS]')} ${chalk(message)}`,
        payload: payload,
      };
    } else return { message: `${chalk.green('[SUCCESS]')} ${chalk(message)}` };
  }

  warning<T = undefined>(message: string, payload?: T) {
    if (payload) {
      return {
        message: `${chalk.red('[WARNING]')} ${chalk(message)}`,
        payload: payload,
      };
    } else return { message: `${chalk.red('[WARNING]')} ${chalk(message)}` };
  }
}

export const messenger: Messenger = new Messenger();
