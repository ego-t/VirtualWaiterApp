// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  firebase : {
    apiKey: 'AIzaSyAFZZbgKzOpVHkA_1TvkBYMtsPylXJzxXA',
    authDomain: 'virtual-waiter-c6d42.firebaseapp.com',
    databaseURL: 'https://virtual-waiter-c6d42.firebaseio.com',
    projectId: 'virtual-waiter-c6d42',
    storageBucket: 'virtual-waiter-c6d42.appspot.com',
    messagingSenderId: '25596833522',
    appId: '1:25596833522:web:2069e6509b3364e1'
  },
  URL_API: 'http://ec2-18-231-198-246.sa-east-1.compute.amazonaws.com:3000/api'
};

/* http://localhost:3000/api
*  http://ec2-18-231-198-246.sa-east-1.compute.amazonaws.com/api
*  http://192.168.1.1:8100/api
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
