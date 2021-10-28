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

class ExpressServerConfiguration {
  private _processEnvironmentVariables: IProcessEnvironmentVariables;
  private _serverOptions: IServerOptions;
  private _cookieOptions: Partial<ICookieOptions>;

  constructor() {
    this._processEnvironmentVariables = this.processEnvironmentVariables;
    this._serverOptions = this.serverOptions;
    this._cookieOptions = this.cookieOptions;
  }

  get processEnvironmentVariables(): IProcessEnvironmentVariables {
    const { NODE_ENV, DATABASE_USER, DATABASE_USER_PASSWORD, DATABASE_NAME } =
      process.env as IProcessEnvironmentVariables;

    return {
      NODE_ENV,
      DATABASE_USER,
      DATABASE_USER_PASSWORD,
      DATABASE_NAME,
    };
  }

  get serverOptions(): IServerOptions {
    return {
      protocol: this.isDevelopmentMode ? 'https' : 'http',
      hostname: 'localhost',
      port: this.isDevelopmentMode ? 8080 : 8443,
      url: function () {
        return `${this.protocol}://${this.hostname}:${this.port}`;
      },
    };
  }

  get cookieOptions(): Partial<ICookieOptions> {
    return {
      httpOnly: true,
      sameSite: !this.isDevelopmentMode,
      secure: !this.isDevelopmentMode,
    };
  }

  get isDevelopmentMode(): boolean {
    return this.processEnvironmentVariables.NODE_ENV === 'development';
  }
}

export const expressServerConfiguration: ExpressServerConfiguration =
  new ExpressServerConfiguration();
