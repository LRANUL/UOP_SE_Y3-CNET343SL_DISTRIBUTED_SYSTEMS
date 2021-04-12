// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  MOVBOOK_BACKEND_URL: "http://localhost:5000/",
  MOVBOOK_BACKEND_ADMIN_SERVER_URL:"http://localhost:4242/",
  firebase: {
  apiKey: "AIzaSyDgIZg9bO1QslkIm_c00Ivp4Qql-C-lyKI",
  authDomain: "movbook-18609.firebaseapp.com",
  projectId: "movbook-18609",
  storageBucket: "movbook-18609.appspot.com",
  messagingSenderId: "1069731166949",
  appId: "1:1069731166949:web:92d5f46a3b09050966f20c",
  measurementId: "G-G89C73GZ08"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
