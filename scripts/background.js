let tabId;
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
chrome.webNavigation.onCommitted.addListener(() => {
    chrome.tabs.getSelected(null, (tab) => {
        tabId = tab.id
    });
    chrome.tabs.executeScript(tabId, {
        code: `let a = document.createElement("div");a.onclick=()=>{setTimeout(()=>{document.querySelector('#loadingAnimation').style.opacity='0';setTimeout(()=>{try{document.body.removeChild(document.querySelector('#loadingAnimation'));}catch(e){}},500);},500);};a.id='loadingAnimation';a.classList.add('pg-loading');a.innerHTML="<style>@keyframes a-lb{0%{transform:translateX(-300px)}5%{transform:translateX(-240px)}15%,25%{transform:translateX(-30px)}30%,45%{transform:translateX(-20px)}50%,65%{transform:translateX(-15px)}70%,95%{transform:translateX(-10px)}to{transform:translateX(-5px)}}@keyframes a-s{to{opacity:1}}#loadingAnimation.fold img{opacity:0!important;margin-top:-128px!important;visibility:hidden;}#loadingAnimation.fold{height:96px}#loadingAnimation{height:320px;transform:unset;top:60px;right:12px;left:unset;width:400px;position:fixed;border-radius:6px;box-shadow:0 2px 10px rgba(0, 0, 0, .2);background:#fff;z-index:999999;}.progress{animation:a-s 2.5s 1 forwards;background-color: #f1f1f1;height: 4px;margin: 56px auto 20px;opacity: 0;overflow: hidden;position: relative;width: 300px;}.progress:before{animation:a-lb 20s 1s linear forwards;background-color: #00bcd4;content: '';display: block;height: 100%;position: absolute;transform: translateX(-300px);width: 100%;}</style><img style='margin: 48px auto 0 auto;width:200px;display:block;animation: a-s .25s 1.25s 1 forwards;opacity: 0;border-radius:12px;height:100px;left: calc(50% - 100px);overflow:hidden;top:0;transform:scaleY(1);transform-origin:top;' src='${chrome.runtime.getURL("/images/Page.svg")}' alt='Page'><div class='progress default'></div><p style='animation: a-s .25s 1.25s 1 forwards;opacity: 0;color: #757575;font-size: 16px;letter-spacing: .2px;line-height: 20px;text-align: center;'>${chrome.i18n.getMessage('downloadingResources')}</p>";document.body.appendChild(a);setTimeout(()=>{a.classList.add('fold')},1000);`
    });
}, {
    url: [{
        hostContains: 'ditiezu.'
    }],
});
chrome.webNavigation.onDOMContentLoaded.addListener(() => {
    chrome.tabs.executeScript(tabId, {
        code: `const extId='${chrome.runtime.id}';`
    });
    chrome.tabs.executeScript(tabId, {
        file: "defaultScript.js"
    });
}, {
    url: [{
        hostContains: 'ditiezu.'
    }],
});
chrome.webNavigation.onCompleted.addListener(() => {
    chrome.tabs.executeScript(tabId, {code: "try{setTimeout(()=>{document.querySelector('#loadingAnimation').style.opacity='0';setTimeout(()=>{try{document.body.removeChild(document.querySelector('#loadingAnimation'));}catch(e){}},500);},500);}catch(e){}"});
}, {
    url: [{
        hostContains: 'ditiezu.'
    }],
});