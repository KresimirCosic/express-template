# express-template

A template for ExpressJS with PostgreSQL and Typescript support in mind.

## Features

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [OpenSSL](https://www.openssl.org/) (if you are on Windows, refer to [this link](https://medium.com/swlh/installing-openssl-on-windows-10-and-updating-path-80992e26f6a1) to add openssl to the PATH for the scripts to be able to work natively through cmd; I believe if you use Bash from GIT that it should work natively, but this doesn't hurt to do anyways)

## Setup

> mkdir my-project-directory

> git clone https://github.com/KresimirCosic/express-template ./my-project-directory

> cd my-project-directory

> npm i

Create a file named **./src/certificate/req.cnf**. The file ought to have this information for (unverified) SSL certificate creation:

```
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
C = .
ST = .
L = .
O = .
OU = .
CN = www.localhost.com
[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = www.localhost.com
DNS.2 = localhost.com
DNS.3 = localhost
```

Create a file **./.env** and enter the database information inside:

```
DATABASE_NAME=my_database_name
DATABASE_USER=user_that_can_log_into_the_database
DATABASE_USER_PASSWORD=password_for_that_user
```

> npm run setup

## Development

To start the development server, run:

> npm run dev

#### IMPORTANT!

The setup of development uses cross-origin rule to allow requests to be recieved from a different origin. As you will be developing with different frontend frameworks, you should adjust the port number in the allowed rule in the **./src/index.ts** file:

```
app.use(
    cors({
      credentials: true,
      // the origin (most probably port only) ought to change depending on the port the frontend app is served on - i.e. Angular uses :4200, while others might use a different port
      origin: 'https://localhost:4200',
    })
  );
```

## Production

> npm run build

This will generate the server files inside the **./dist/** directory. To run the build production server code, run:

> npm run serve

This serves the file **'./dist/server.js** that also holds the **./dist/public** directory which is used as a starting point for serving static content - in other words, here place the static files that are built by your frontend framework (like Angular's **build** command).
