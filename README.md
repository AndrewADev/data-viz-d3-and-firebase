# data-viz-d3-and-firebase

This project combines the exercises of Shaun Pelling's D3.js & Firebase course with a Vue-Bootstrap SPA (as opposed to Vanilla JS and Material design.)

## Project setup
This project assumes you are running against a firebase firestore instance for persistence. See [Google's documentation](https://cloud.google.com/firestore/docs/quickstart-servers) for creating a firestore instance.

Once you've created a firestore instance, you will need to setup the environment file with your configuration values. If you'd like, you can simply run the command:

```
npm run setup
```

And a blank configuration file will be created for you. **You will still need to add your own configuration values.**

Otherwise, you can do this yourself by simply copying the below snippet into a file called `.env.local` and filling in with the values from the firebase console: Settings > Project Settings:

```
VUE_APP_FIREBASE_API_KEY='YOUR_VAL_HERE'
VUE_APP_FIREBASE_AUTH_DOMAIN='YOUR_VAL_HERE'
VUE_APP_FIREBASE_DB_URL='YOUR_VAL_HERE'
VUE_APP_FIREBASE_PROJ_ID='YOUR_VAL_HERE'
VUE_APP_FIREBASE_STORAGE_BUCKET='YOUR_VAL_HERE'
VUE_APP_FIREBASE_MESSAGE_SENDER_ID='YOUR_VAL_HERE'
VUE_APP_FIREBASE_MESSAGE_APP_ID='YOUR_VAL_HERE'
```

This file is automatically setup to be ignored by version control, and should allow you to store the necessary credentials only on the machine running the app, without accidentally publishing them by committing them.

## Running the project

After setup, the rest is the same as normal for a project managed with NPM. To start:

```
npm install
```
Then to run:

*Compiles and hot-reloads for development*
```
npm run serve
```

*Compiles and minifies for production*
```
npm run build
```

*Lints and fixes files*
```
npm run lint
```

*Run your unit tests* (currently disabled)
```
npm run test:unit
```
