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