chrome.runtime.sendMessage({ action: "contentScriptLoaded" });

const blurImages = () => {
  const switchButton = document.getElementById("toggleSwitch");
  const slider = document.getElementById("myRange");
  const slider_value = document.getElementById("slider_value");

  switchButton.addEventListener("change", function () {
    const isSwitchOn = this.checked;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "toggleBlur", isSwitchOn },
        (response) => {
          console.log(response);
        }
      );
    });
  });

  slider.addEventListener("input", function () {
    const sliderValue = this.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "changeBlurLevel", sliderValue },
        (response) => {
          slider_value.textContent = `Blur level: ${response.blurLevel}`
        }
      );
    });
  });
};

blurImages();
