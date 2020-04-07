import { getImagesForPreview } from '../frame/utils';

const canvas = document.querySelector('.canvas-animation_item');
const ctx = canvas.getContext('2d');
const slider = document.querySelector('.slidecontainer-slider');
const output = document.querySelector('.slidecontainer-output');
output.innerHTML = slider.value;
const canvasWidth = 300;
const canvasHeight = 150;

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame;
}());


let imageIndex = 1;
let animPctComplete = 0;
let imagesOK = 0;
const imgs = [];

function animate() {
  requestAnimFrame(animate);
  const img = imgs[imageIndex];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  animPctComplete += 0.1;
  if (animPctComplete >= 1.00) {
    animPctComplete = 0.00;
    imageIndex += 1;
    if (imageIndex >= imgs.length) {
      imageIndex = 0;
    }
  }
}

function loadAllImages(imageURLs, fps) {
  for (let i = 0; i < imageURLs.length; i += 1) {
    const img = new Image();
    imgs.push(img);
    img.onload = function () {
      imagesOK ++;
      if (imagesOK === imageURLs.length) {
        setTimeout(animate, 1000 / fps);
      }
    };
    img.src = imageURLs[i];
  }
}

slider.addEventListener('input', () => {
    
  output.innerHTML = slider.value;
  const fps = slider.value;
  const result = getImagesForPreview();
  loadAllImages(result, fps);
});
