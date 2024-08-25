document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    alert("Registration successful!");
                } else {
                    const error = await response.json();
                    console.error("Error:", error.error);
                    alert("Registration failed: " + error.error);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Network error. Please try again later.");
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    alert("Login successful!");

                    // Redirect to the dashboard
                    window.location.href = result.redirect_url;
                } else {
                    const error = await response.json();
                    console.error("Error:", error.error);
                    alert("Login failed: " + error.error);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Network error. Please try again later.");
            }
        });
    }
});
