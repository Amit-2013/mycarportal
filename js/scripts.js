// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');

    // Example of handling form submissions
    const loginForm = document.querySelector('form[action="/api/login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = '/';
                } else {
                    alert('Login failed');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Example of dynamic content update
    const fetchCarData = () => {
        fetch('/api/car_data')
            .then(response => response.json())
            .then(data => {
                const carList = document.getElementById('car-list');
                if (carList) {
                    carList.innerHTML = '';
                    data.manufacturers.forEach(manufacturer => {
                        const li = document.createElement('li');
                        li.textContent = manufacturer;
                        carList.appendChild(li);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    fetchCarData();
});
