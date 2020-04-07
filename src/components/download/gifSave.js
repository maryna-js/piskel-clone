const GIF = require('gif.js');

export function saveToGif() {
  const gif = new GIF({
    workers: 4,
    quality: 10,
    width: 145,
    height: 145,
  });
  return gif;
}
