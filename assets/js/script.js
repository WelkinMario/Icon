document.getElementById('iconForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const text = event.target.icon.value;
    const font = event.target.font.value;
    showLoadingSpinner();
    WebFont.load({
        google: {
            families: [font]
        },
        active: function() {  
            generateImages(text, font);
            hideLoadingSpinner();
        },
        inactive: function() {
            alert('Font not loaded');
            hideLoadingSpinner();
        }
    });
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

    // Generate images with random borders
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
    for (let i = 0; i < 6; i++) {
        const ctn = document.createElement('div');
        const block = document.createElement('div');
        const back = document.createElement('div');
        const pic = document.createElement('div');
        block.className = "block";
        back.className = "back";
        pic.className = "pic";
        block.appendChild(back);
        block.appendChild(pic);
        ctn.appendChild(block);
        container.appendChild(ctn);

        pic.style.fontFamily = font;
        pic.textContent = text;        
        adjustFontSize(pic);
        
        // Add download button
        html2canvas(block).then(canvas => {
            const downloadLink = document.createElement('a');
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = `icon_${i}.png`;
            downloadLink.textContent = 'Download';

            ctn.appendChild(downloadLink);
        });
    }
}

function adjustFontSize(element) {
    let fontSize = 120; // Start font size
    element.style.fontSize = `${fontSize}px`;

    while (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) {
        fontSize--;
        element.style.fontSize = `${fontSize}px`;
        if (fontSize <= 10) break;
    }
}