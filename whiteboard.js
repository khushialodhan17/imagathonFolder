let currentPage = 0;
const pages = [];
let eraserActive = false;
let drawingShape = false;
let currentShape = 'free'; // 'rect' for rectangle, 'circle' for circles, 'free' for free drawing
let startX, startY;
const whiteboardContainer = document.getElementById('whiteboardContainer');

function createWhiteboard() {
    const whiteboard = document.createElement('div');
    whiteboard.className = 'whiteboard';
    const canvas = document.createElement('canvas');
    canvas.width = 1200; // Update the width of the canvas to match the whiteboard

    canvas.height = 600;
    whiteboard.appendChild(canvas);
    whiteboardContainer.appendChild(whiteboard);
    pages.push(canvas);

    const ctx = canvas.getContext('2d');
    let drawing = false;
    let savedCanvasData;

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        startX = e.offsetX;
        startY = e.offsetY;

        // Save the existing canvas content before drawing a shape
        savedCanvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        if (currentShape === 'free') {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;

        if (currentShape === 'free') {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = eraserActive ? '#ffffff' : document.getElementById('colorPicker').value;
            ctx.lineWidth = eraserActive ? document.getElementById('eraserSize').value : 5;
            ctx.stroke();
        } else {
            // Redraw the saved canvas data to prevent erasing previous drawings
            ctx.putImageData(savedCanvasData, 0, 0);
            drawShape(ctx, startX, startY, e.offsetX, e.offsetY);
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        drawing = false;
        if (currentShape !== 'free') {
            drawShape(ctx, startX, startY, e.offsetX, e.offsetY, true);
        }
        ctx.closePath();
    });

    return canvas;
}

function drawShape(ctx, x1, y1, x2, y2, finalize = false) {
    const color = document.getElementById('colorPicker').value;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    if (currentShape === 'rect') {
        const width = x2 - x1;
        const height = y2 - y1;
        ctx.strokeRect(x1, y1, width, height);
    } else if (currentShape === 'circle') {
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;
        ctx.beginPath();
        ctx.arc((x1 + x2) / 2, (y1 + y2) / 2, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function addPage() {
    createWhiteboard();
}

// Add Page button event
document.getElementById('addPage').addEventListener('click', addPage);

// Toggle eraser
document.getElementById('toggleEraser').addEventListener('click', () => {
    eraserActive = !eraserActive;
    currentShape = 'free'; // When eraser is activated, free draw mode is reset
    document.getElementById('toggleEraser').innerText = eraserActive ? 'Drawing' : 'Eraser';
});

// Shape selection
document.getElementById('shapePicker').addEventListener('change', (e) => {
    currentShape = e.target.value;
    eraserActive = false; // Reset eraser if a shape is selected
});

// Save as PDF
document.getElementById('save').addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    for (let i = 0; i < pages.length; i++) {
        const canvas = pages[i];
        await html2canvas(canvas).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 140);
        });
    }

    pdf.save('whiteboard.pdf');
});

// Erase all
document.getElementById('eraseAll').addEventListener('click', () => {
    pages.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});

// Initialize the first page
addPage();

document.getElementById('goToWhiteboard').addEventListener('click', function() {
    window.open('whiteboard.html', '_blank'); // Replace with your actual whiteboard page URL
});


