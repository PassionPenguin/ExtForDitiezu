chrome.runtime.onInstalled.addListener(function () {
    new chrome.declarativeContent.ShowPageAction();
});

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request.getId === true)
        sendResponse(chrome.runtime.id);
    if (request.xhr === true) {
        const xhr = new XMLHttpRequest(),
            method = request.xhrMode.toUpperCase(),
            url = request.xhrUrl;

        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            // In local files, status is 0 upon success in Mozilla Firefox
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let status = xhr.status, res = xhr.response;
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    sendResponse({status: status, res: res});
                } else {
                    // Oh no! There has been an error with the request!
                    sendResponse({status: status, err: true});
                }
            }
        };
        xhr.send();
    }
});
chrome.webNavigation.onCommitted.addListener(() => {
    chrome.tabs.executeScript({
        code: `let a = document.createElement("div");a.id='loadingAnimation';a.classList.add('pg-loading');a.innerHTML="<style>@keyframes a-lb{0%{transform:translateX(-300px)}5%{transform:translateX(-240px)}15%,25%{transform:translateX(-30px)}30%,45%{transform:translateX(-20px)}50%,65%{transform:translateX(-15px)}70%,95%{transform:translateX(-10px)}to{transform:translateX(-5px)}}@keyframes a-s{to{opacity:1}}#loadingAnimation{top:50%;left:50%;width:400px;height:320px;position:fixed;transform:translate(-50%,-50%);border-radius:6px;box-shadow:0 2px 10px rgba(0, 0, 0, .2);background:#fff;z-index:99999;}.progress{animation:a-s 2.5s 1 forwards;background-color: #f1f1f1;height: 4px;margin: 56px auto 20px;opacity: 0;overflow: hidden;position: relative;width: 300px;}.progress:before{animation:a-lb 20s 1s linear forwards;background-color: #00bcd4;content: '';display: block;height: 100%;position: absolute;transform: translateX(-300px);width: 100%;}</style><img style='margin: 48px auto 0 auto;width:200px;display:block;animation: a-s .25s 1.25s 1 forwards;opacity: 0;border-radius:12px;height:100px;left: calc(50% - 100px);overflow:hidden;top:0;transform:scaleY(1);transform-origin:top;' src='${chrome.runtime.getURL("/images/Page.svg")}' alt='Page'><div class='progress default'></div><p style='animation: a-s .25s 1.25s 1 forwards;opacity: 0;color: #757575;font-size: 16px;letter-spacing: .2px;line-height: 20px;text-align: center;'>${chrome.i18n.getMessage('downloadingResources')}</p>";document.body.appendChild(a);`
    });
}, {
    url: [{
        hostContains: '.ditiezu.'
    }],
});
chrome.webNavigation.onCompleted.addListener(function (details) {
    chrome.tabs.executeScript({
        code: `const extId='${chrome.runtime.id}';setTimeout(()=>{document.querySelector('#loadingAnimation').style.opacity='0';setTimeout(()=>{try{document.body.removeChild(document.querySelector('#loadingAnimation'));}catch(e){}},2000);},2000);`
    });
    chrome.tabs.executeScript({
        file: "defaultScript.js"
    });
}, {
    url: [{
        hostContains: '.ditiezu.'
    }],
});