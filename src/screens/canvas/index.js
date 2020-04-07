import {
  TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_BUCKET, TOOL_ERASER,
} from '../../components/tools/toolInit';
import Paint from '../../components/tools/paintTool';
import {
  createUlFrame, getFramesImageData, getFramesImageDataForGif, duplicate,
} from '../../components/frame/utils';
import { loadAllImages } from '../../components/animation/animation';
import { fullScreen } from '../../components/fullscreen/fullscreen';
import { saveToGif } from '../../components/download/gifSave';
import { signInFoogle } from '../../components/login/authGoogle';

const frameButton = document.querySelector('.frame-button_create');

const paint = new Paint('canvas');
paint.activeTool = TOOL_PENCIL;
paint.lineWidth = 4;
paint.selectedColor = 'white';
paint.init(128);

document.querySelectorAll('[data-tool]').forEach(
  (item) => {
    item.addEventListener('click', (e) => {
      document.querySelector('[data-tool].active').classList.toggle('active');
      item.classList.toggle('active');
      const selectedTool = item.getAttribute('data-tool');
      paint.activeTool = selectedTool;
      switch (selectedTool) {
        case TOOL_LINE:
        case TOOL_PENCIL:
          document.querySelector('.group linewidths');
        case TOOL_BUCKET:
        case TOOL_ERASER:
        default:
      }
    });
  },
);

document.querySelectorAll('[data-pen-size]').forEach(
  (item) => {
    item.addEventListener('click', (e) => {
      document.querySelector('[data-pen-size].active').classList.toggle('active');
      item.classList.toggle('active');
      const pencilWidth = item.getAttribute('data-pen-size');
      paint.lineWidth = pencilWidth;
    });
  },
);


const colorPicker = document.querySelector('.primary');
colorPicker.addEventListener('input', (e) => {
  paint.selectedColor = e.target.value;
});

frameButton.addEventListener('click', (e) => {
  paint.clearContext();
  document.querySelector('.active-frame').classList.remove('active-frame');
  createUlFrame();
  const element = event.currentTarget;
  element.clicks = (element.clicks || 0) + 1;
  const frameCount = element.clicks + 1;
  localStorage.setItem('count', frameCount);
  const buttonClose = document.querySelectorAll('.button-close');
  buttonClose.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      item.parentNode.style.display = 'none';
    });
  });

  const buttonDuplicate = document.querySelectorAll('.button-duplicate');
  buttonDuplicate.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const original = item.parentNode;
      duplicate(original);
      const frameItem = document.querySelectorAll('.active-frame');
      frameItem.forEach((item) => {
        item.classList.remove('active-frame');
      });
      frameItem[frameItem.length - 1].classList.add('active-frame');
    });
  });
});


const buttonFullScreen = document.querySelector('.canvas-animation_fullscreen');
buttonFullScreen.addEventListener('click', () => {
  fullScreen();
});

const UPNG = require('upng-js');
const download = require('downloadjs');

const ugngButton = document.querySelector('.canvas-animation_upng');

ugngButton.addEventListener('click', () => {
  const buffer = getFramesImageData();

  const result = UPNG.encode(buffer, 145, 145, 0, 10);
  download(result, 'image.apng', 'apng');
});

const gifButton = document.querySelector('.canvas-animation_gif');
gifButton.addEventListener('click', () => {
  const gifResult = saveToGif();

  const imageData = getFramesImageDataForGif();

  const newCanvasList = [];
  imageData.forEach((item, index) => {
    newCanvasList[index] = document.createElement('canvas');
    const newCtx = newCanvasList[index].getContext('2d');
    newCtx.putImageData(item, 0, 0);
    gifResult.addFrame(newCanvasList[index], { delay: 200 });
  });
  gifResult.render();
  gifResult.on('finished', (item) => { download(item, 'image.gif', 'gif'); });
});

const signInButton = document.querySelector('.header-sign');
signInButton.addEventListener('click', () => {
  signInFoogle();
});
