# Flowcore Create React App Proof of Concept

The purpose of this repository is to demonstrate how to use Flowcore with a React application. It is a simple application that allows you to submit a message to a webhook, query a readmodel for the messages that have been submitted, and show the results in a word cloud.

## Environmental variables

### REACT_APP_WEBHOOK_URL

This is the URL of the webhook to send events to. You can find this in the Flowcore UI under Ingestion Channels -> Webhook. You also need the API key for the webhook, which you can find under Settings your organization profile.

### REACT_APP_READMODEL

This is the URL of the readmodel with the messages. You generate this URL via the Scenario builder in the Flowcore UI. You need to add the datacore, an adapter and a readmodel. You can find the URL under the readmodel's settings.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
