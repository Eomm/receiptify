# receiptify
Get a receipt for your listened songs!

This project is a refactored version of the original receiptify idea by [@michellexliu](https://github.com/michellexliu/receiptify).
This refactor is based on **Fastify** and **React + Vite** and _it does not include advertisements_.

## Installation

This project requires:

- [Node.js](https://nodejs.org/) v20+ to run.
- _[optional:]_[fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/) to manage the application.

To install the dependancies run the following command from the root directory:

```bash
npm ci
npm run install:all
```

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


To run the project with hot reloading you need to follow the steps below:

```sh
cd projects/frontend
npm run dev

# In new terminal:
cd projects/frontend
npm run dev

# Then you can open the application on http://localhost:8080/
```

## Production

Good to know:

- For the sake of experimenting: the frontend production build will be served by the backend application
- The build process is defined in `Dockerfile`
- The `fly.toml` file is used by `fly` to fulfill the Docker image
