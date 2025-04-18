// frontend/main.js

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

// Initialize Firebase
firebase.initializeApp(window.env.firebaseConfig);
const messaging = firebase.messaging();

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('firebase-messaging-sw.js')
    .then(registration => {
      console.log("Service Worker registered:", registration.scope);
      window.swRegistration = registration;
    })
    .catch(err => {
      console.error("Service Worker registration failed:", err);
    });
} else {
  console.warn("Service Workers not supported.");
}

// Subscribe button listener
document.getElementById("subscribeBtn").addEventListener("click", async () => {
  const statusElem = document.getElementById("status");
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      statusElem.textContent = "Status: Notification permission denied.";
      return;
    }

    const token = await messaging.getToken({
      vapidKey: window.env.firebaseConfig.vapidKey,
      serviceWorkerRegistration: window.swRegistration
    });

    if (!token) {
      statusElem.textContent = "Status: Failed to receive token.";
      return;
    }

    //console.log("FCM Token:", token);
    // Send token to backend
    const res = await fetch(
      `${window.env.backendUrl}/devices/register`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fcm_token: token })
      }
    );

    const data = await res.json();
    if (res.ok) {
      statusElem.textContent = `Status: Subscribed (${data.total_tokens} tokens)`;
    } else {
      statusElem.textContent = `Status: Registration error: ${data.detail || "Unknown error"}`;
    }

  } catch (err) {
    console.error("Subscription error:", err);
    statusElem.textContent = "Status: Error during subscription.";
  }
});
