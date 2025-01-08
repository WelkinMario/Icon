document.getElementById('searchInput').addEventListener('focus', function() {
    document.getElementById('fontSelectContainer').style.display = 'block';
});

document.getElementById('searchInput').addEventListener('input', function() {
    var filter = this.value.toLowerCase();
    var options = document.getElementById('fontSelect').getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.textContent.toLowerCase().startsWith(filter)) {
            option.selected = true;
            option.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            break;
        }
    }
});

document.getElementById('fontSelect').addEventListener('change', function() {
    var selectedOption = this.options[this.selectedIndex];
    document.getElementById('searchInput').value = selectedOption.textContent;
    document.getElementById('fontSelectContainer').style.display = 'none';
});

document.addEventListener('click', function(event) {
    var isClickInside = document.getElementById('fontSelectContainer').contains(event.target) || document.getElementById('searchInput').contains(event.target);
    if (!isClickInside) {
        document.getElementById('fontSelectContainer').style.display = 'none';
    }
});

document.getElementById('iconForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const text = processInput(event.target.icon.value);
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

function processInput(str) { 
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function generateImages(text, font) {
    const container = document.getElementById('imagesContainer');
    container.innerHTML = ''; // Clear previous images
        
    for (let i = 0; i < 6; i++) {
        const ctn = document.createElement('div');
        const block = document.createElement('div');
        const back = document.createElement('div');
        const pic = document.createElement('div');
        block.className = "block";
        back.className = "back";
        back.id = `back_${i}`;
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