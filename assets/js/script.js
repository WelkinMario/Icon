document.getElementById('iconForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const text = event.target.icon.value;
    const font = event.target.font.value;
    showLoadingSpinner();
    generateImages(text, font);
});

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function generateImages(text, font) {
    const container = document.getElementById('imagesContainer');
    container.innerHTML = ''; // Clear previous images

    // Load the selected font from Google Fonts
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css?family=${font.replace(' ', '+')}&text=${encodeURIComponent(text)}`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Generate images with random borders
    for (let i = 0; i < 5; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        /*
        // Set random rectangle properties
        const rectWidth = Math.random() * 100 + 50; // Random width between 50 and 150
        const rectHeight = Math.random() * 100 + 50; // Random height between 50 and 150
        const rectX = Math.random() * (200 - rectWidth); // Random x position
        const rectY = Math.random() * (200 - rectHeight); // Random y position

        // Draw the rectangle
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
        */
        // Set font and draw text
        ctx.font = `100px ${font} sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        // Add download button
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = `icon_${i}.png`;
        downloadLink.textContent = 'Download';
        container.appendChild(canvas);
        container.appendChild(downloadLink);
    }
    console.log('Images generated');
    hideLoadingSpinner();
}