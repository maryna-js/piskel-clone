const firebase = require('firebase/app');
require('firebase/auth');

const signInButton = document.querySelector('.header-sign');
const firebaseConfig = {
  apiKey: 'AIzaSyCXYj27HtOJi6OErKmG6_tRIlwx1P_z6QQ',
  authDomain: 'simple-piskel-clone-d18b5.firebaseapp.com',
  databaseURL: 'https://simple-piskel-clone-d18b5.firebaseio.com',
  projectId: 'simple-piskel-clone-d18b5',
  storageBucket: 'simple-piskel-clone-d18b5.appspot.com',
  messagingSenderId: '572867809574',
  appId: '1:572867809574:web:4f39cb2d4a665612b3f1e7',
  measurementId: 'G-RGT3PM4MYY',
};

export function signInFoogle() {
  firebase.initializeApp(firebaseConfig);
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    const { user } = result;
    signInButton.innerHTML = user.displayName;
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });
}
