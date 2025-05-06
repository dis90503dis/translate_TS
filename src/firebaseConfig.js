import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB1YjRZJlXJN_VfxbknaqeZaziX3Wd-U8U",
    authDomain: "healthy-food-53ebc.firebaseapp.com",
    projectId: "healthy-food-53ebc",
    storageBucket: "healthy-food-53ebc.appspot.com",
    messagingSenderId: "794906499442",
    appId: "1:794906499442:web:539dcd4eef61619beee5eb",
    measurementId: "G-ZVFHXTW9K3"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp