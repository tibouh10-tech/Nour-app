// firebase-messaging-sw.js
// Ce fichier DOIT être à la racine du site (pas dans un sous-dossier)
// Il permet de recevoir les notifications FCM même quand l'app est fermée

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Même config que dans l'app
firebase.initializeApp({
  apiKey:            "AIzaSyAe3UOrR0texnJFjq9sbSylL8eJ76bKAR4",
  authDomain:        "nour-app-68d01.firebaseapp.com",
  projectId:         "nour-app-68d01",
  storageBucket:     "nour-app-68d01.firebasestorage.app",
  messagingSenderId: "853522861651",
  appId:             "1:853522861651:web:f733432d6a9d573516c0a6"
});

const messaging = firebase.messaging();

// Notification reçue en arrière-plan (app fermée)
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Notification reçue en arrière-plan:', payload);

  const { title, body, icon } = payload.notification || {};

  self.registration.showNotification(title || 'نور · Nour', {
    body:  body  || 'Ta vidéo est prête !',
    icon:  icon  || '/icon.png',
    badge: '/icon.png',
    tag:   'nour-notification',
    data:  payload.data || {},
    actions: [
      { action: 'open',     title: '▶ Ouvrir l\'app' },
      { action: 'download', title: '⬇ Télécharger' }
    ]
  });
});

// Clic sur la notification → ouvrir l'app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Installation du Service Worker
self.addEventListener('install', () => {
  console.log('[SW] Nour Service Worker installé');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('[SW] Nour Service Worker activé');
});
