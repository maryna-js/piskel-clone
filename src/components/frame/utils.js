export function createUlFrame() {
  const ul = document.querySelector('.frames-list');
  const li = document.createElement('li');
  li.setAttribute('class', 'frame-unit');
  const frame = document.createElement('canvas');
  const buttonClose = document.createElement('button');
  const buttonDuplicate = document.createElement('button');
  li.appendChild(frame);
  li.appendChild(buttonClose);
  li.appendChild(buttonDuplicate);
  ul.appendChild(li);
  frame.className = 'frame';
  buttonClose.className = 'button-close';
  buttonDuplicate.className = 'button-duplicate';
  buttonClose.innerHTML = '<i class="fas fa-window-close"></i>';
  buttonDuplicate.innerHTML = '<i class="fas fa-clone"></i>';
  frame.width = 150;
  frame.height = 150;
  const frameItem = document.querySelectorAll('.frame');
  frameItem[frameItem.length - 1].classList.add('active-frame');
  frameItem.forEach((element) => {
    element.addEventListener('click', () => {
      document.querySelector('.active-frame').classList.remove('active-frame');
      element.classList.add('active-frame');
    });
  });
  if (frame.className === '.active-frame') {
    const dstCtx = frame.getContext('2d');
    const dataURL = localStorage.getItem('canvas');
    const img = new Image();
    img.src = dataURL;
    return img.onload = function () {
      dstCtx.drawImage(img, 0, 0, 145, 145);
    };
  }
}

export function getImagesForPreview() {
  const frameList = document.querySelectorAll('.frame');
  const nameLengths = Array.from(frameList).map((item) => item.toDataURL());
  return nameLengths;
}

export function getFramesImageData() {
  const arrayBuffer = [];
  const frameList = document.querySelectorAll('.frame');
  frameList.forEach((item) => {
    const context = item.getContext('2d');
    const imageData = context.getImageData(0, 0, 145, 145);
    const { buffer } = imageData.data;
    arrayBuffer.push(buffer);
  });
  return arrayBuffer;
}

export function getFramesImageDataForGif() {
  const arrayBuffer = [];
  const frameList = document.querySelectorAll('.frame');
  frameList.forEach((item) => {
    const context = item.getContext('2d');
    const imageData = context.getImageData(0, 0, 145, 145);
    const buffer = imageData;
    arrayBuffer.push(buffer);
  });
  return arrayBuffer;
}

export function drawOnFrame() {
  const frameActive = document.querySelector('.active-frame');
  frameActive.width = 150;
  frameActive.height = 150;
  const dstCtx = frameActive.getContext('2d');
  const dataURL = localStorage.getItem(canvas);
  const img = new Image();
  img.src = dataURL;
  return img.onload = function () {
    dstCtx.drawImage(img, 0, 0, 145, 145);
    const imgData = dstCtx.getImageData(0, 0, 145, 145);
    const stack = [];
    stack.push(imgData);
  };
}

export function duplicate(original) {
  const clone = original.cloneNode(true);
  original.parentNode.appendChild(clone);
}
