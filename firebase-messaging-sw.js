// frontend/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js');

window.env = {
  firebaseConfig: {
    apiKey: "random-api-key",
    authDomain: "...firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket.firebasestorage.app",
    messagingSenderId: "0000000000",
    appId: "a:b:0d0:a",
    measurementId: "",
    vapidKey: ""
  },
  backendUrl: "http://localhost:8000"
};

firebase.initializeApp(window.env.firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body, icon: '/firebase-logo.png' });
});
