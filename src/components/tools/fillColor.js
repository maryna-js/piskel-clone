import Point from './point';

export default class FillColor {
  constructor(canvas, point, color) {
    this.context = canvas.getContext('2d');
    this.imageData = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);
    const colorTarget = this.getPixel(point);
    const colorFill = this.convertHexToRgb(color);

    this.fillStack = [];

    this.floodFill(point, colorTarget, colorFill);
    this.colorFill();
  }

  floodFill(point, colorTarget, colorFill) {
    if (this.colorsMatch(colorTarget, colorFill)) return;

    const currentColor = this.getPixel(point);

    if (this.colorsMatch(currentColor, colorTarget)) {
      this.setPixel(point, colorFill);
      this.fillStack.push([new Point(point.x + 1, point.y), colorTarget, colorFill]);
      this.fillStack.push([new Point(point.x - 1, point.y), colorTarget, colorFill]);
      this.fillStack.push([new Point(point.x, point.y + 1), colorTarget, colorFill]);
      this.fillStack.push([new Point(point.x, point.y - 1), colorTarget, colorFill]);
    }
  }

  colorFill() {
    if (this.fillStack.length) {
      const range = this.fillStack.length;

      for (let i = 0; i < range; i++) {
        this.floodFill(this.fillStack[i][0], this.fillStack[i][1], this.fillStack[i][2]);
      }
      this.fillStack.splice(0, range);
      this.colorFill();
    } else {
      this.context.putImageData(this.imageData, 0, 0);
      this.fillStack = [];
    }
  }

  getPixel(point) {
    if (point.x < 0 || point.y < 0 || point.x >= this.imageData.width, point.y >= this.imageData.height) {
      return [-1, -1, -1, -1];
    }
    const offset = (point.y * this.imageData.width + point.x) * 4;
    const arr = [
      this.imageData.data[offset + 0],
      this.imageData.data[offset + 1],
      this.imageData.data[offset + 2],
      this.imageData.data[offset + 3],
    ];
    return arr;
  }

  setPixel(point, colorFill) {
    const offset = (point.y * this.imageData.width + point.x) * 4;
    this.imageData.data[offset + 0] = colorFill[0];
    this.imageData.data[offset + 1] = colorFill[1];
    this.imageData.data[offset + 2] = colorFill[2];
    this.imageData.data[offset + 3] = colorFill[3];
  }

  colorsMatch(color1, color2) {
    return color1[0] === color2[0] && color1[1] === color2[1]
               && color1[2] === color2[2] && color1[3] === color2[3];
  }

  convertHexToRgb(hexValue) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    const rgbArray = [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
      255,
    ];
    return rgbArray;
  }
}
// new Point - point is not defined
