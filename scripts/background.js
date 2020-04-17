chrome.runtime.onInstalled.addListener(function () {
    new chrome.declarativeContent.ShowPageAction();
});

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
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