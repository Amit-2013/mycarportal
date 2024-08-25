document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    console.log(result);
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    console.log(result);
    localStorage.setItem('token', result.access_token);
});

document.getElementById('blogForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:5000/blogs/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    });

    const result = await response.json();
    console.log(result);
});

document.getElementById('photoForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const url = document.getElementById('photoUrl').value;

    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:5000/photos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
    });

    const result = await response.json();
    console.log(result);
});
