// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

// Import Firebase configuration 
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const authLinks = document.getElementById('auth-links');
const userProfile = document.getElementById('user-profile');
const userEmailSpan = document.getElementById('user-email');
const profileBtn = document.getElementById('profile-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const logoutBtn = document.getElementById('logout-btn');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

// Utility Functions
function showMessage(message, isError = false) {
  const messageEl = isError ? errorMessage : successMessage;
  messageEl.textContent = message;
  messageEl.style.display = 'block';
  
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 5000);
}

function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function getStarted() {
  // Check if user is logged in
  const isLoggedIn = userProfile.style.display !== 'none';
  
  if (isLoggedIn) {
    // Redirect to dashboard
    showMessage('Redirecting to dashboard...');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  } else {
    // Redirect to signup
    showMessage('Redirecting to sign up...');
    setTimeout(() => {
      window.location.href = 'signup.html';
    }, 1000);
  }
}

// Make functions global for onclick handlers
window.scrollToFeatures = scrollToFeatures;
window.getStarted = getStarted;

// Toggle dropdown menu
if (profileBtn) {
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  if (dropdownMenu) {
    dropdownMenu.classList.remove('show');
  }
});

// Prevent dropdown from closing when clicking inside
if (dropdownMenu) {
  dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// Handle logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
      // Add loading state
      logoutBtn.classList.add('loading');
      
      await signOut(auth);
      
      // For demo purposes, simulate logout
      setTimeout(() => {
        showMessage('Logged out successfully!');
        // Simulate user state change
        handleAuthStateChange(null);
        logoutBtn.classList.remove('loading');
      }, 1000);
      
    } catch (error) {
      console.error('Logout error:', error);
      showMessage('Error logging out. Please try again.', true);
      logoutBtn.classList.remove('loading');
    }
  });
}

// Handle authentication state changes
function handleAuthStateChange(user) {
  if (user) {
    // User is signed in
    console.log('User is logged in:', user.email);
    
    authLinks.style.display = 'none';
    userProfile.style.display = 'block';
    userEmailSpan.textContent = user.email;
    
  } else {
    // User is signed out
    console.log('User is not logged in');
    
    authLinks.style.display = 'flex';
    userProfile.style.display = 'none';
    
    if (dropdownMenu) {
      dropdownMenu.classList.remove('show');
    }
  }
}

// Monitor authentication state
onAuthStateChanged(auth, handleAuthStateChange);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});

// Loading animation for buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function() {
    if (!this.classList.contains('loading')) {
      this.classList.add('loading');
      setTimeout(() => {
        this.classList.remove('loading');
      }, 2000);
    }
  });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  console.log('FigureIt Homepage loaded successfully');
});