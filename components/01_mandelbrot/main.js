let minX = -2.5;
let maxX = 1.0;
let minY = -1.5;
let maxY = 1.5;
let maxIterations = 300;
let zoomSpeed = 0.1;
let canvasElement;

function setup() {
    const wrapper = select('#canvasWrapper');
    const size = min(windowWidth * 0.95, 800);
    canvasElement = createCanvas(size, size * 0.8);
    canvasElement.parent(wrapper);
    pixelDensity(1);
    bindSourceButton();
    renderMandelbrot();
}

function bindSourceButton() {
    const showSourceBtn = document.getElementById('showSourceBtn');
    const closeSourceBtn = document.getElementById('closeSourceBtn');
    const sourcePanel = document.getElementById('sourcePanel');

    showSourceBtn.addEventListener('click', async () => {
        await loadSourceFiles();
        sourcePanel.classList.remove('hidden');
    });

    closeSourceBtn.addEventListener('click', () => {
        sourcePanel.classList.add('hidden');
    });
}

async function loadSourceFiles() {
    const errorContainer = document.getElementById('sourceErrors');
    const htmlSource = document.getElementById('htmlSource');
    const cssSource = document.getElementById('cssSource');
    const jsSource = document.getElementById('jsSource');

    errorContainer.textContent = '';
    htmlSource.textContent = 'Loading...';
    cssSource.textContent = 'Loading...';
    jsSource.textContent = 'Loading...';

    try {
        const [htmlText, cssText, jsText] = await Promise.all([
            fetch('./index.html').then(r => r.text()),
            fetch('./style.css').then(r => r.text()),
            fetch('./main.js').then(r => r.text()),
        ]);

        htmlSource.textContent = htmlText;
        cssSource.textContent = cssText;
        jsSource.textContent = jsText;
    } catch (error) {
        errorContainer.textContent = 'Unable to load source files. If this page is opened from the file system, run it from a local server.';
        htmlSource.textContent = '';
        cssSource.textContent = '';
        jsSource.textContent = '';
    }
}

function renderMandelbrot() {
    loadPixels();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const a0 = map(x, 0, width, minX, maxX);
            const b0 = map(y, 0, height, minY, maxY);
            let a = a0;
            let b = b0;
            let n = 0;

            while (n < maxIterations) {
                const aa = a * a - b * b;
                const bb = 2 * a * b;
                a = aa + a0;
                b = bb + b0;

                if (a * a + b * b > 16) {
                    break;
                }

                n++;
            }

            const bright = floor(map(n, 0, maxIterations, 0, 255));
            const index = (x + y * width) * 4;
            pixels[index + 0] = bright;
            pixels[index + 1] = bright;
            pixels[index + 2] = bright;
            pixels[index + 3] = 255;
        }
    }

    updatePixels();
}

function mouseWheel(event) {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return false;
    }

    const zoomPointX = map(mouseX, 0, width, minX, maxX);
    const zoomPointY = map(mouseY, 0, height, minY, maxY);
    const zoomAmount = event.delta > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;

    const newWidth = (maxX - minX) * zoomAmount;
    const newHeight = (maxY - minY) * zoomAmount;

    minX = zoomPointX - (zoomPointX - minX) * zoomAmount;
    maxX = minX + newWidth;
    minY = zoomPointY - (zoomPointY - minY) * zoomAmount;
    maxY = minY + newHeight;

    renderMandelbrot();
    return false;
}

function windowResized() {
    const size = min(windowWidth * 0.95, 800);
    resizeCanvas(size, size * 0.8);
    renderMandelbrot();
}