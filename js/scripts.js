async function loadCarData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/car_data');
        const data = await response.json();
        populateSelect('manufacturer', data.manufacturers);
        populateSelect('color', data.colors);

        document.getElementById('manufacturer').addEventListener('change', async function () {
            const manufacturer = this.value;
            const models = data.models[manufacturer] || [];
            populateSelect('model', models);
        });
    } catch (error) {
        console.error('Error loading car data:', error);
    }
}

function populateSelect(id, options) {
    const select = document.getElementById(id);
    select.innerHTML = '<option value="">Select</option>';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

async function submitForm() {
    const manufacturer = document.getElementById('manufacturer').value;
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const feedback = document.getElementById('feedback').value;
    const blog = document.getElementById('blog').value;
    const photo = document.getElementById('photo').files[0];

    // Submit feedback and blog
    await fetch('http://127.0.0.1:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manufacturer, model, color, feedback })
    });

    await fetch('http://127.0.0.1:5000/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manufacturer, model, color, blog })
    });

    // Upload photo
    const formData = new FormData();
    formData.append('file', photo);

    await fetch('http://127.0.0.1:5000/api/upload_photos', {
        method: 'POST',
        body: formData
    });

    alert('Form submitted successfully!');
}

// Load car data on page load
window.onload = loadCarData;
