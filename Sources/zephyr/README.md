# h4412-smart zephyr: Client
SMART project - 2019

![logo](https://i.imgur.com/1UYavpo.png)

[Trello 🐕](https://trello.com/b/0CWH3OC0/smart)

# Techs

- [**R**eact](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Grommet](https://v2.grommet.io)
- [Webpack](https://webpack.js.org)
- [React Redux](https://react-redux.js.org/)
- [Axios](https://www.npmjs.com/package/axios)

# Setup

## [Install NodeJS (including npm) on Linux (Ubuntu)](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)

> Only one time for all the projects!

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## [Clone the repo](https://github.com/Staylix/zephyr)

```bash
git clone https://github.com/Staylix/zephyr.git
```

## Install dependencies

```bash
cd zephyr/
sudo npm install
```

# Start

## Start Node server

```bash
npm start
```

Default port is: 3000

# Build

```bash
npm run build
```

# Switch to the production server

To switch to the production server, comment the desired version of the globalURL variable at the begining of the `/src/constants/themes.ts` file.


# Create React App Doc (Auto-generated)

Je le laisse, ça peut toujours servir.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
