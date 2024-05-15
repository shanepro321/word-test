document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');

    // Register form submit event
    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(registrationForm);
        const username = formData.get('username');
        const password = formData.get('password');
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        alert(data.message); // Show registration response message
    });

    // Login form submit event
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get('loginUsername');
        const password = formData.get('loginPassword');
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        alert(data.message); // Show login response message
    });
});

function navigateToQuiz() {
    // Logic to navigate to the quiz page
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'block'; // Show the quiz page
}
