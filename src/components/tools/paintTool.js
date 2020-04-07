import {
  TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_BUCKET, TOOL_ERASER,
} from './toolInit';
import { getMouseCoordinates, findDistanceCircle } from './utils';
import background from '../../screens/canvas/assets/images/background-canvas.png';
import fillColor from './fillColor';
import { drawOnFrame } from '../frame/utils';

export default class Paint {
  constructor(canvas) {
    this.canvas = document.getElementById(canvas);
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
  }

  set activeTool(tool) {
    this.tool = tool;
  }

  set lineWidth(lineWidth) {
    this._lineWidth = lineWidth;
    this.context.lineWidth = this._lineWidth;
  }

  set selectedColor(color) {
    this.color = color;
    this.context.strokeStyle = this.color;
  }

  init(canvasSize) {
    this.scaleVAlue = Math.floor(this.width / canvasSize);
    this.context.scale(this.scaleVAlue, this.scaleVAlue);
    this.canvas.onmousedown = (e) => this.onMouseDown(e);
    Paint.loadBackground(this.canvas);
  }

  static loadBackground(canvas) {
    canvas.style.background = `url(${background})`;
  }

  onMouseDown(e) {
    this.savedData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.canvas.onmousemove = (e) => this.onMouseMove(e);
    document.onmouseup = (e) => this.onMouseUp(e);
    this.startPosition = getMouseCoordinates(e, this.canvas);
    switch (this.tool) {
      case TOOL_PENCIL:
        this.context.beginPath();
        this.context.moveTo(this.startPosition.x, this.startPosition.y);
        break;
      case TOOL_BUCKET:
        new fillColor(this.canvas, this.startPosition, this.color);
        break;
    }
  }

  onMouseMove(e) {
    this.currentPosition = getMouseCoordinates(e, this.canvas);
    switch (this.tool) {
      case TOOL_LINE:
      case TOOL_RECTANGLE:
      case TOOL_CIRCLE:
        this.drawShape();
        break;
      case TOOL_PENCIL:
        this.drawSketchLine(this._lineWidth);
        break;
      default:
        break;
    }
  }

  onMouseUp(e) {
    this.savetoLocalStorage();
    this.canvas.onmousemove = null;
    document.onmouseup = null;
    drawOnFrame();
  }

  drawShape() {
    this.context.putImageData(this.savedData, 0, 0);
    this.context.beginPath();
    switch (this.tool) {
      case TOOL_LINE:
        this.context.moveTo(this.startPosition.x, this.startPosition.y);
        this.context.lineTo(this.currentPosition.x, this.currentPosition.y);
        break;
      case TOOL_RECTANGLE:
        this.context.rect(this.startPosition.x, this.startPosition.y, this.currentPosition.x - this.startPosition.x, this.currentPosition.y - this.startPosition.y);
        break;
      case TOOL_CIRCLE:
        const distance = findDistanceCircle(this.startPosition, this.currentPosition);
        this.context.arc(this.startPosition.x, this.startPosition.y, distance, 0, 2 * Math.PI, false);
    }

    this.context.stroke();
  }

  drawSketchLine(lineWidth) {
    this.context.lineWidth = lineWidth;
    this.context.lineTo(this.currentPosition.x, this.currentPosition.y);
    this.context.stroke();
  }

  savetoLocalStorage() {
    localStorage.setItem(this.canvas, canvas.toDataURL());
  }

  clearContext() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
