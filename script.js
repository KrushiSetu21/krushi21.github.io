// ✅ Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyV19G9qRvY7pR6D0wypmk2X24pRSXfTU",
  authDomain: "krushi-setu-715fa.firebaseapp.com",
  projectId: "krushi-setu-715fa",
  storageBucket: "krushi-setu-715fa.appspot.com",
  messagingSenderId: "527906404531",
  appId: "1:527906404531:web:b0c045b4ba2dec1226c226"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let confirmationResult;

// ✅ OTP Functions
window.sendOTP = function() {
  const phoneNumber = document.getElementById("phone-number").value;
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'send-otp-btn', {});
  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      document.getElementById("otp-section").classList.remove("hidden");
      alert("OTP sent successfully!");
    })
    .catch((error) => alert(error.message));
};

window.verifyOTP = function() {
  const otp = document.getElementById("otp-input").value;
  confirmationResult.confirm(otp)
    .then(() => {
      document.getElementById("auth-section").classList.add("hidden");
      document.getElementById("registration-form-section").classList.remove("hidden");
    })
    .catch(() => alert("Invalid OTP!"));
};

// ✅ Save Registration
document.getElementById("farmer-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, "farmers"), {
      name: document.getElementById("full-name").value,
      state: document.getElementById("state-select").value,
      scheme: document.getElementById("scheme-select").value
    });
    alert("✅ Registration Successful!");
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// ✅ Multi-Language Support
const translations = {
  en: {
    "site-title": "Krushi Setu",
    "hero-title": "One Platform for All Farmer Government Schemes",
    "hero-subtitle": "Find details about eligibility, documents, and deadlines easily.",
    "register-title": "Farmer Registration",
    "phone-label": "Phone Number",
    "send-otp-btn": "Send OTP",
    "otp-label": "Enter OTP",
    "verify-otp-btn": "Verify OTP",
    "name-label": "Full Name",
    "state-label": "State",
    "scheme-label": "Interested Scheme",
    "submit-btn": "Register",
    "footer-text": "© 2025 Krushi Setu | All rights reserved."
  },
  hi: {
    "site-title": "कृषि सेतु",
    "hero-title": "सभी किसान सरकारी योजनाओं के लिए एक मंच",
    "hero-subtitle": "पात्रता, दस्तावेज़ और अंतिम तिथि की जानकारी आसानी से पाएं।",
    "register-title": "किसान पंजीकरण",
    "phone-label": "मोबाइल नंबर",
    "send-otp-btn": "ओटीपी भेजें",
    "otp-label": "ओटीपी दर्ज करें",
    "verify-otp-btn": "ओटीपी सत्यापित करें",
    "name-label": "पूरा नाम",
    "state-label": "राज्य",
    "scheme-label": "इच्छित योजना",
    "submit-btn": "पंजीकरण करें",
    "footer-text": "© 2025 कृषि सेतु | सर्वाधिकार सुरक्षित।"
  },
  mr: {
    "site-title": "कृषी सेतु",
    "hero-title": "सर्व शेतकरी सरकारी योजनांसाठी एक व्यासपीठ",
    "hero-subtitle": "पात्रता, कागदपत्रे आणि अंतिम मुदत यांची माहिती सहज मिळवा.",
    "register-title": "शेतकरी नोंदणी",
    "phone-label": "मोबाईल नंबर",
    "send-otp-btn": "ओटीपी पाठवा",
    "otp-label": "ओटीपी टाका",
    "verify-otp-btn": "ओटीपी पडताळा",
    "name-label": "पूर्ण नाव",
    "state-label": "राज्य",
    "scheme-label": "इच्छित योजना",
    "submit-btn": "नोंदणी करा",
    "footer-text": "© 2025 कृषी सेतु | सर्व हक्क राखीव."
  }
};

window.switchLanguage = function(lang) {
  document.querySelectorAll("[id]").forEach(el => {
    if (translations[lang][el.id]) {
      el.innerText = translations[lang][el.id];
    }
  });
};