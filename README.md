# React TODO App

# Environment variables

This project uses the following environment variables:

| Name         | Description                 | Default value          |
| ------------ | --------------------------- | ---------------------- |
| VITE_API_URL | URL pointing to the backend | http://localhost:5000/ |

All env variables can be modified by adding a `.env.local` file to the root of the project.

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) v16.4.2

# Getting started

- Clone the repository

```
git clone https://github.com/alessrdrgz/todo-app-frontend.git
```

- Install dependencies

```
cd todo-app-frontend
npm install
```

- Run the project

```
npm run dev
```

## Project structure

The folder structure of this app is explained below:

| Name               | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| **dist**           | Contains the distributable (or output) from your TypeScript build. |
| **node_modules**   | Contains all npm dependencies                                      |
| **src/components** | Contains all custom React components                               |
| **src/interfaces** | Contains all custom interfaces used in the application             |
| **src/pages**      | Contains all React pages                                           |
| **src/styles**     | Contains all styles used by the application                        |
| **src/tools**      | Contains some utility TypeScripts classes                          |
| **src/App.tsx**    | App routing                                                        |
| **src/main.tsx**   | React root element                                                 |
