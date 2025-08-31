// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

// Import Firebase configuration from separate file
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const container = document.querySelector('.container');
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');

// Switch to login form  
loginBtn.addEventListener('click', () => {
    container.classList.add('active');
});

// Switch to register form
registerBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// Helper function to show loading state
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.textContent = 'Loading...';
    } else {
        button.disabled = false;
        button.textContent = button.id === 'registerForm' ? 'Register' : 'Login';
    }
}

// Handle Registration
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const submitBtn = this.querySelector('.btn');
    
    // Basic validation
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    
    setLoadingState(submitBtn, true);
    
    try {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        alert("Registration successful!");
        
        // Redirect to homepage
        window.location.href = "homepage.html";
        
    } catch (error) {
        console.error("Registration error:", error);
        
        // Handle specific error cases
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert("This email is already registered. Please use a different email or try logging in.");
                break;
            case 'auth/invalid-email':
                alert("Please enter a valid email address.");
                break;
            case 'auth/weak-password':
                alert("Password is too weak. Please choose a stronger password.");
                break;
            case 'auth/network-request-failed':
                alert("Network error. Please check your internet connection and try again.");
                break;
            default:
                alert(`Registration failed: ${error.message}`);
        }
    } finally {
        setLoadingState(submitBtn, false);
    }
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const submitBtn = this.querySelector('.btn');
    
    // Basic validation
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }
    
    setLoadingState(submitBtn, true);
    
    try {
        // Sign in user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const welcomeName = user.email;
        alert(`Login successful! Welcome back, ${welcomeName}!`);
        
        // Redirect to homepage
        window.location.href = "homepage.html";
        
    } catch (error) {
        console.error("Login error:", error);
        
        // Handle specific error cases
        switch (error.code) {
            case 'auth/user-not-found':
                alert("No account found with this email. Please register first.");
                break;
            case 'auth/wrong-password':
                alert("Incorrect password. Please try again.");
                break;
            case 'auth/invalid-email':
                alert("Please enter a valid email address.");
                break;
            case 'auth/user-disabled':
                alert("This account has been disabled. Please contact support.");
                break;
            case 'auth/too-many-requests':
                alert("Too many failed attempts. Please try again later.");
                break;
            case 'auth/network-request-failed':
                alert("Network error. Please check your internet connection and try again.");
                break;
            default:
                alert(`Login failed: ${error.message}`);
        }
    } finally {
        setLoadingState(submitBtn, false);
    }
});

// Optional: Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is already logged in:", user.email);
        // Optionally redirect to homepage if already logged in
        // window.location.href = "homepage.html";
    }
});
