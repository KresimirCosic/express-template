import fs from 'fs';
import path from 'path';

interface IProcessEnvironmentVariables extends NodeJS.ProcessEnv {
  NODE_ENV: string;
  DATABASE_USER: string;
  DATABASE_USER_PASSWORD: string;
  DATABASE_NAME: string;
}

interface IServerOptions {
  protocol: string;
  hostname: string;
  port: number;
  url(): string;
}

interface ICookieOptions {
  maxAge: number;
  expires: Date;
  path: string;
  domain: string;
  sameSite: boolean;
  secure: boolean;
  httpOnly: boolean;
  signed: boolean;
  overwrite: boolean;
}

interface ISSLOptions {
  key: Buffer;
  cert: Buffer;
}

class ExpressServerConfiguration {
  private _startDate: Date;
  private _processEnvironmentVariables: IProcessEnvironmentVariables;
  private _serverOptions: IServerOptions;
  private _cookieOptions: Partial<ICookieOptions>;
  private _SSLOptions: ISSLOptions;

  constructor() {
    this._startDate = new Date();

    const { NODE_ENV, DATABASE_USER, DATABASE_USER_PASSWORD, DATABASE_NAME } =
      process.env as IProcessEnvironmentVariables;

    this._processEnvironmentVariables = {
      NODE_ENV,
      DATABASE_USER,
      DATABASE_USER_PASSWORD,
      DATABASE_NAME,
    };

    this._serverOptions = {
      protocol: this.isDevelopmentMode ? 'http' : 'https',
      hostname: 'localhost',
      port: this.isDevelopmentMode ? 8080 : 8443,
      url: () => {
        const { protocol, hostname, port } = this.serverOptions;
        return `${protocol}://${hostname}:${port}`;
      },
    };

    this._cookieOptions = {
      httpOnly: true,
      sameSite: !this.isDevelopmentMode,
      secure: !this.isDevelopmentMode,
    };

    this._SSLOptions = {
      key: fs.readFileSync(
        path.resolve(
          __dirname,
          this.isDevelopmentMode ? '../certificate/cert.key' : './cert.key'
        )
      ),
      cert: fs.readFileSync(
        path.resolve(
          __dirname,
          this.isDevelopmentMode ? '../certificate/cert.pem' : './cert.pem'
        )
      ),
    };
  }

  get isDevelopmentMode(): boolean {
    const { NODE_ENV } = this.processEnvironmentVariables;
    return NODE_ENV === 'development';
  }

  get startDate(): Date {
    return this._startDate;
  }

  get processEnvironmentVariables(): IProcessEnvironmentVariables {
    return this._processEnvironmentVariables;
  }

  get serverOptions(): IServerOptions {
    return this._serverOptions;
  }

  get cookieOptions(): Partial<ICookieOptions> {
    return this._cookieOptions;
  }

  get SSLOptions(): ISSLOptions {
    return this._SSLOptions;
  }
}

export const expressServerConfiguration: ExpressServerConfiguration =
  new ExpressServerConfiguration();
