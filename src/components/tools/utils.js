import Point from './point';


const canvasSizeScale = 6;

function getBoundingClientRect(canvas) {
    return canvas.getBoundingClientRect();
  }

export function getMouseCoordinates(e, canvas) {
  const domRect = getBoundingClientRect(canvas);
  const x = Math.round(e.clientX - domRect.left) / canvasSizeScale;
  const y = Math.round(e.clientY - domRect.top) / canvasSizeScale;
  return new Point(x, y);
}

export function findDistanceCircle(startPosition, currentPosition) {
  const expressionA = Math.pow(currentPosition.x - startPosition.x, 2);
  const expressionB = Math.pow(currentPosition.y - startPosition.y, 2);
  const distance = Math.sqrt(expressionA + expressionB);
  return distance;
}

export function updateColor(event, elementClass) {
  const element = document.querySelector(elementClass);
  if (element) {
    element.style.color = event.target.value;
  }
}

