interface INodeJSWithEnvironmentVariables extends NodeJS.ProcessEnv {
  NODE_ENV: string;
}

export const { NODE_ENV } = process.env as INodeJSWithEnvironmentVariables;

export function isDevelopmentMode() {
  return NODE_ENV === 'development';
}

interface IServerOptions {
  protocol: string;
  hostname: string;
  port: number;
  url(): string;
}

export const SERVER_OPTIONS: IServerOptions = {
  protocol: isDevelopmentMode() ? 'http' : 'https',
  hostname: 'localhost',
  port: isDevelopmentMode() ? 8080 : 8443,
  url: function () {
    return `${this.protocol}://${this.hostname}:${this.port}`;
  },
};

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

export const COOKIE_OPTIONS: Partial<ICookieOptions> = {
  httpOnly: true,
  sameSite: !isDevelopmentMode(),
  secure: !isDevelopmentMode(),
};
