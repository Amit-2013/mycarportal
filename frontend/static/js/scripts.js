document.addEventListener('DOMContentLoaded', function () {
    const manufacturerSelects = document.querySelectorAll('#manufacturer, #blog-manufacturer, #photo-manufacturer');
    const modelSelects = document.querySelectorAll('#model, #blog-model, #photo-model');
    const colorSelects = document.querySelectorAll('#color, #blog-color, #photo-color');

    // Fetch car data
    fetch('/api/car_data')
        .then(response => response.json())
        .then(data => {
            populateDropdown(manufacturerSelects, data.manufacturers);
            populateDropdown(colorSelects, data.colors);
            manufacturerSelects.forEach(select => {
                select.addEventListener('change', function () {
                    const selectedManufacturer = this.value;
                    const models = data.models[selectedManufacturer] || [];
                    modelSelects.forEach(modelSelect => {
                        populateDropdown(modelSelect, models);
                    });
                });
            });
        });

    // Submit feedback form
    document.getElementById('feedback-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const feedbackData = new FormData(this);
        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(feedbackData.entries()))
        })
        .then(response => response.json())
        .then(data => alert('Feedback submitted successfully!'));
    });

    // Submit blog form
    document.getElementById('blog-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const blogData = new FormData(this);
        fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(blogData.entries()))
        })
        .then(response => response.json())
        .then(data => alert('Blog submitted successfully!'));
    });

    // Upload photo form
    document.getElementById('photo-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const photoData = new FormData(this);
        fetch('/api/upload_photos', {
            method: 'POST',
            body: photoData
        })
        .then(response => response.json())
        .then(data => alert('Photo uploaded successfully!'));
    });

    function populateDropdown(selectElement, options) {
        selectElement.innerHTML = '';
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.text = option;
            selectElement.appendChild(opt);
        });
    }
});
