# receiptify
Get a receipt for your listened songs!

## Installation

This project requires [Node.js](https://nodejs.org/) v20+ to run.

TODO

## Development

After the installation, you can run the application in the development mode from the root directory with the following command:

```bash
npm run start:dev
```

During the development:

- the frontend application will be available on the following URL [http://localhost:8080/](http://localhost:8080/)
- the backend application will be available on the following URL [http://localhost:3000/](http://localhost:3000/)

Both the applications will be reloaded automatically whenever a change is made in the source code.

> ℹ Note  
> The `project.json` file is used by `nx` to identify the projects in the monorepo. **Do not delete it.**  
> Configuring the `workspaces` in the root `package.json` file breaks the `fly` deployment.

## Production

TODO: The frontend production build will be served by the backend application.

TODO:
  - multiple spotify credentials (dev/prod)
  - CI workflow