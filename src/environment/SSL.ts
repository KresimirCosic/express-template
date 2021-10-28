import fs from 'fs';
import path from 'path';

import { isDevelopmentMode } from './';

export const SSLOptions = {
  key: fs.readFileSync(
    path.resolve(
      __dirname,
      isDevelopmentMode() ? '../certificate/cert.key' : './cert.key'
    )
  ),
  cert: fs.readFileSync(
    path.resolve(
      __dirname,
      isDevelopmentMode() ? '../certificate/cert.pem' : './cert.pem'
    )
  ),
};
