let isBlurOn = false;
let blurLevel = 10;

function applyBlurToImages() {
  const images = document.querySelectorAll('img');
  images.forEach(function(image) {
    if (isBlurOn) {
      image.style.filter = `blur(${blurLevel}px)`;
    } else {
      image.style.filter = 'none';
    }
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.action === 'toggleBlur') {
    isBlurOn = request.isSwitchOn;
    applyBlurToImages();
    sendResponse({ message: 'Blur value changed', isBlurOn: isBlurOn });
  } else if (request.action === 'changeBlurLevel') {
    blurLevel = request.sliderValue;
    applyBlurToImages();
    sendResponse({ message: 'Blur level changed successfully.', blurLevel: blurLevel });
  }
});