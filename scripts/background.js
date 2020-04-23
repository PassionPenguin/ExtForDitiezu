chrome.runtime.onInstalled.addListener(function () {
    new chrome.declarativeContent.ShowPageAction();
});
chrome.extension.onConnect.addListener(function (port) {
    console.assert(port.name === "screenshot");
    port.onMessage.addListener(function (msg) {
        if (msg.request === "screenshot") {
            chrome.tabs.captureVisibleTab(null, null, function (img) {
                //post message only after call back return with Data URL
                port.postMessage(img);
            });
        }
    });
});
chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
    chrome.tabs.executeScript(details.tabId, {
        code: `const extId='${chrome.runtime.id}';`
    });
    chrome.tabs.executeScript(details.tabId, {
        file: "defaultScript.js"
    });
}, {
    url: [{
        hostContains: 'ditiezu.'
    }],
});