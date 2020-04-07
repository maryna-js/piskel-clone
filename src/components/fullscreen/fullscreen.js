export function fullScreen() {
  if ('fullscreenEnabled' in document || 'webkitFullscreenEnabled' in document || 'mozFullScreenEnabled' in document || 'msFullscreenEnabled' in document) {
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
      const element = document.querySelector('.canvas-animation_item');
      if ('requestFullscreen' in element) {
        element.requestFullscreen();
      } else if ('webkitRequestFullscreen' in element) {
        element.webkitRequestFullscreen();
      } else if ('mozRequestFullScreen' in element) {
        element.mozRequestFullScreen();
      } else if ('msRequestFullscreen' in element) {
        element.msRequestFullscreen();
      }
    }
  }
}
