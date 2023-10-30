console.log("content.js loaded");

// load css
function addStyleSheet(documentRoot, filename) {
    var link = document.createElement("link");
    link.href = chrome.runtime.getURL(filename);
    link.type = "text/css";
    link.rel = "stylesheet";
    (documentRoot.head || documentRoot.documentElement).appendChild(link);
}


const observer = new MutationObserver((mutations, observer) => {
    const teamsIframe = document.querySelector('iframe.embedded-electron-webview.embedded-page-content');

    if (teamsIframe) {
        const teamsDocument = teamsIframe.contentDocument
        const toolbar = teamsDocument.querySelector('[data-tid="compose-bottom-toolbar"]');
        if (toolbar) {
            addStyleSheet(teamsDocument, 'styles/content.css');

            const gooseImage = document.createElement('img');
            gooseImage.src = chrome.runtime.getURL('images/igoose16.png');
            gooseImage.Image = 'iGoose';
            gooseImage.className = "ui-toolbar__itemicon";

            const backgroundDiv = document.createElement('div');
            backgroundDiv.className = "igoose-image-background";
            backgroundDiv.append(gooseImage);

            const imgDiv = document.createElement('div');
            imgDiv.className = "ui-toolbar__itemicon";
            imgDiv.append(backgroundDiv);

            const iGButton = document.createElement('button');
            iGButton.append(imgDiv)
            iGButton.className = "ui-toolbar__item e fu fz ga gb gc ek el em en fv fw fx fy avm gh js cv im cx in gi avn dv gk avo avp avq avr gl gm gn go gp gq gr gs gt gu gv gw gx gy gz ha hb hc hd he hf hg hh hi hj hk hl hm hn ho hp hq hr hs ht hu hv hw hx hy hz ia ib ic id ie if ig ih ii ij ik";
            iGButton.addEventListener('click', () => {
                alert('Send message');
            });

            const buttonDiv = document.createElement('div');
            buttonDiv.className = "ms-FocusZone ui-toolbar bi cu e avi avj";
            buttonDiv.append(iGButton);

            toolbar.firstElementChild.insertAdjacentElement("afterend", buttonDiv)
            console.log('Toolbar found, button inserted');
            observer.disconnect();
        } else {
            console.log('No toolbar found');
        }
        console.log('Teams iframe found');
    }
});

const observerConfig = {
    childList: true,
    subtree: true
};
observer.observe(document.body, observerConfig);
