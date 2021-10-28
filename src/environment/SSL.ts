import fs from 'fs';
import path from 'path';

import { expressServerConfiguration } from './';

export const SSLOptions = {
  key: fs.readFileSync(
    path.resolve(
      __dirname,
      expressServerConfiguration.isDevelopmentMode
        ? '../certificate/cert.key'
        : './cert.key'
    )
  ),
  cert: fs.readFileSync(
    path.resolve(
      __dirname,
      expressServerConfiguration.isDevelopmentMode
        ? '../certificate/cert.pem'
        : './cert.pem'
    )
  ),
};
