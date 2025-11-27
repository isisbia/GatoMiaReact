import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyAouaJSO0_foB86teLYVpZPSA3T-wIyYMQ",
  authDomain: "gato-mia-fd7a5.firebaseapp.com",
  projectId: "gato-mia-fd7a5",
  storageBucket: "gato-mia-fd7a5.firebasestorage.app",
  messagingSenderId: "50705734840",
  appId: "1:50705734840:web:0b84732aa6de7a0886684d",
  measurementId: "G-2E2X4K55WB"
};

const app = initializeApp(firebaseConfig);

/// ================= EXPORTAÇÕES =================

// 🔐 Auth
export const auth = getAuth(app);

// 🔥 Firestore
export const db = getFirestore(app);

// 📁 Storage
export const storage = getStorage(app);

// 🔑 Google Provider (Login com Google)
export const googleProvider = new GoogleAuthProvider();

// ✅ App Check (RECAPTCHA V3)
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcKXAQsAAAAAMm6QKz3YNENiAO4sIx-0on7MJyO"),
  isTokenAutoRefreshEnabled: true
});

export default app;
