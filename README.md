# Setup node (only if you have not installed)

This project uses [asdf](https://asdf-vm.com/#/). \
Follow the installation [instructions](https://asdf-vm.com/#/core-manage-asdf?id=asdf)

After installation you need to follow these steps:

```bash
# Add nodejs plugin on asdf
$ asdf plugin add nodejs

# Install nodejs plugin
$ asdf install nodejs 14.16.0

# Set the default nodejs for the project
$ asdf local nodejs 14.16.0
```

# Available Scripts

In the project directory, you can run:

## `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `yarn test --watchAll`

Launches the test runner for all files. 

## `yarn test -- --coverage`

Launches the test runner for all files with coverage report.