const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyAK6PnylR1_VEAU5f02wkr2mzG-Nssw1C8",
    authDomain: "webgis-9400c.firebaseapp.com",
    projectId: "webgis-9400c",
    storageBucket: "webgis-9400c.appspot.com",
    messagingSenderId: "721084739125",
    appId: "1:721084739125:web:d712bb9697a62886920b7c",
    measurementId: "G-XW9SG522FG"
  };

// Initialize Firebase
const app = firebaseinitializeApp(firebaseConfig);
getAnalytics(app)
