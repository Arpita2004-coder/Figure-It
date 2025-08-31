// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

// Import Firebase configuration from separate file
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

// Toggle dropdown menu
profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
});

// Prevent dropdown from closing when clicking inside
dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Handle logout
logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        await signOut(auth);
        alert('Logged out successfully!');
        // The onAuthStateChanged listener will handle UI updates
    } catch (error) {
        console.error('Logout error:', error);
        alert('Error logging out. Please try again.');
    }
});

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log('User is logged in:', user.email);
        
        // Show user profile, hide auth links
        authLinks.style.display = 'none';
        userProfile.style.display = 'block';
        
        // Display user email in profile
        userEmailSpan.textContent = user.email;
        
    } else {
        // User is signed out
        console.log('User is not logged in');
        
        // Show auth links, hide user profile
        authLinks.style.display = 'flex';
        userProfile.style.display = 'none';
        
        // Clear dropdown state
        dropdownMenu.classList.remove('show');
    }
});

// Optional: Add some basic styling for the profile dropdown
const style = document.createElement('style');
style.textContent = `
    .profile-dropdown {
        position: relative;
        display: inline-block;
    }
    
    .profile-btn {
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 6px;
        transition: background-color 0.2s;
    }
    
    .profile-btn:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    .profile-btn i.fa-user-circle {
        font-size: 20px;
    }
    
    .profile-btn i.fa-chevron-down {
        font-size: 12px;
        transition: transform 0.2s;
    }
    
    .profile-btn:hover i.fa-chevron-down {
        transform: rotate(180deg);
    }
    
    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e1e5e9;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 200px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
    }
    
    .dropdown-menu.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        color: #333;
        text-decoration: none;
        transition: background-color 0.2s;
    }
    
    .dropdown-item:hover {
        background-color: #f8f9fa;
    }
    
    .dropdown-item i {
        width: 16px;
        font-size: 14px;
    }
    
    .dropdown-divider {
        border: none;
        border-top: 1px solid #e1e5e9;
        margin: 8px 0;
    }
    
    #auth-links {
        display: flex;
        gap: 20px;
    }
    
    #auth-links a {
        text-decoration: none;
        color: inherit;
        padding: 8px 16px;
        border-radius: 6px;
        transition: background-color 0.2s;
    }
    
    #auth-links a:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(style);
