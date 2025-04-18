// frontend/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js');

window.env = {
    firebaseConfig: {
      apiKey: "AIzaSyBpWQq68uq2J8k-oyOVbmgjxzVUect_0sk",
      authDomain: "push-notification-2025-444f3.firebaseapp.com",
      projectId: "push-notification-2025-444f3",
      storageBucket: "push-notification-2025-444f3.firebasestorage.app",
      messagingSenderId: "851252743713",
      appId: "1:851252743713:web:628f7f93517a6943e25d60",
      measurementId: "G-H85B5VE32B",
      vapidKey: "BMWR9r_4b5mgSOrF92-BBTFTNPH9CuForq-wjEj9aLsAK74lc2EQVcX2lmdz3YfC86CWSDS2YfPwzBbq239gefk"
    },
    backendUrl: "http://localhost:8000"
  };

firebase.initializeApp(window.env.firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body, icon: '/firebase-logo.png' });
});
