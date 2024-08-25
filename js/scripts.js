document.addEventListener('DOMContentLoaded', function() {
    const imageUploadForm = document.getElementById('imageUploadForm');
    const gallery = document.getElementById('gallery');

    if (imageUploadForm) {
        imageUploadForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const fileInput = document.getElementById('imageFile');
            const file = fileInput.files[0];

            if (!file) {
                alert('Please select a file to upload.');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    alert("File uploaded successfully!");
                    loadGallery();  // Reload the gallery
                } else {
                    const error = await response.json();
                    console.error("Error:", error.error);
                    alert("Upload failed: " + error.error);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Network error. Please try again later.");
            }
        });
    }

    async function loadGallery() {
        try {
            const response = await fetch('http://localhost:5000/images');
            if (response.ok) {
                const data = await response.json();
                displayImages(data.images);
            } else {
                console.error('Failed to load images');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function displayImages(images) {
        gallery.innerHTML = '';  // Clear previous images
        images.forEach(filename => {
            const img = document.createElement('img');
            img.src = `http://localhost:5000/images/${filename}`;
            img.alt = filename;
            img.style.width = '150px';  // Adjust size as needed
            img.style.margin = '10px';
            gallery.appendChild(img);
        });
    }

    loadGallery();  // Load images on page load
});
