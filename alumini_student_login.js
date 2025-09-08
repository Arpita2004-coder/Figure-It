let selectedRole = null;
let currentStep = 0;
const totalSteps = 3;

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function selectRole(role) {
    selectedRole = role;
    currentStep = 1;
    updateProgress();

    // Update UI
    document.querySelectorAll('.role-card').forEach(card => {
        card.classList.remove('selected');
    });
    // FIX 1: explicitly pass event from HTML OR use window.event
    event.target.closest('.role-card').classList.add('selected');

    // Show appropriate form
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    setTimeout(() => {
        if (role === 'student') {
            document.getElementById('studentForm').classList.add('active');
        } else {
            document.getElementById('alumniForm').classList.add('active');
        }
        currentStep = 2;
        updateProgress();
    }, 300);
}

function autoFillLinkedIn() {
    alert('🔗 LinkedIn Integration\n\nConnecting to LinkedIn to auto-fill:\n• Personal Information\n• Education Details\n• Work Experience\n• Skills & Endorsements\n\nRedirecting to LinkedIn OAuth...');

    // Demo auto-fill
    if (selectedRole === 'student') {
        document.getElementById('studentName').value = 'John Doe';
        document.getElementById('studentEmail').value = 'john.doe@email.com';
        document.getElementById('university').value = 'Stanford University';
        document.getElementById('major').value = 'Computer Science';
    } else if (selectedRole === 'alumni') {
        document.getElementById('alumniName').value = 'Sarah Johnson';
        document.getElementById('alumniEmail').value = 'sarah.johnson@company.com';
        document.getElementById('currentCompany').value = 'Google';
        document.getElementById('jobTitle').value = 'Senior Software Engineer';
    }
}

function autoFillGitHub() {
    alert('🐱 GitHub Integration\n\nConnecting to GitHub to import:\n• Profile Information\n• Bio & Description\n• Technical Skills (from repos)\n• Project Portfolio\n\nRedirecting to GitHub OAuth...');

    // Demo auto-fill
    if (selectedRole === 'student') {
        document.getElementById('studentName').value = 'Alex Chen';
        document.getElementById('studentEmail').value = 'alex.chen@student.edu';
        document.getElementById('studentBio').value = 'Passionate about full-stack development and machine learning. Love contributing to open source projects and building innovative solutions.';
    }
}

function submitForm(role) {
    currentStep = 3;
    updateProgress();

    // Collect form data
    const formData = {};
    const form = document.getElementById(role + 'Form');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (input.checked) {
                if (!formData.interests) formData.interests = [];
                formData.interests.push(input.value);
            }
        } else {
            formData[input.id] = input.value;
        }
    });

    formData.role = role;

    console.log('Form submitted:', formData);

    // FIX 2: use backticks for template literal in alert
    setTimeout(() => {
        alert(`✅ Welcome to FigureIt!\n\n${role === 'student' ? 'Student' : 'Alumni'} profile successfully created.\n\nYou're now part of our unified, intelligent alumni platform. Start connecting, networking, and growing together!`);

        // In a real app, this would redirect to dashboard
        // window.location.href = '/dashboard';
    }, 500);
}

// Initialize
updateProgress();
