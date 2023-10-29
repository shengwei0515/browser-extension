console.log("content.js loaded");


const observer = new MutationObserver((mutations, observer) => {
  const teamsIframe = document.querySelector('iframe.embedded-electron-webview.embedded-page-content');

  if (teamsIframe) {
    const teamsDocument = teamsIframe.contentDocument
    const toolbar = teamsDocument.querySelector('[data-tid="compose-bottom-toolbar"]');
    if (toolbar) {
      const gooseImage = document.createElement('img');
      gooseImage.src = chrome.runtime.getURL('images/goose.png');
      gooseImage.Image = 'iGoose';

      const iGButton = document.createElement('button');
      iGButton.append(gooseImage)
      iGButton.className = "ms-FocusZone ui-toolbar bi dj e bhf bhg bu jf";
      iGButton.addEventListener('click', () => {
        alert('Send message');
      });

      toolbar.firstElementChild.insertAdjacentElement("afterend", iGButton)
      console.log('Toolbar found, button inserted');
      observer.disconnect();
   }
   else {
      console.log('No toolbar found');
   }
   console.log('Teams iframe found');
  }
});

const observerConfig = { childList: true, subtree: true };
observer.observe(document.body, observerConfig);