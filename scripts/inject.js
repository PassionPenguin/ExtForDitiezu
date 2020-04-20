const cE = data => {
    if (data === undefined) data = {
        type: 'div',
        attr: [],
        innerText: undefined,
        innerHTML: undefined,
        onclick: undefined
    };
    let e = document.createElement(data.type);
    if (data.attr !== undefined) data.attr.forEach(attr => {
        e.setAttribute(attr[0], attr[1])
    });
    if (data.innerText !== undefined) e.innerText = data.innerText;
    if (data.innerHTML !== undefined) e.innerHTML = data.innerHTML;
    if (data.onclick !== undefined) e.onclick = e => {
        data.onclick(e)
    };
    return e;
};
const pg = {
    $: (sel) => {
        return document.querySelectorAll(sel);
    }
}
document.body.appendChild(cE({
    type: "div",
    attr: [["id", "pg-captureScreenShot"], ["class", "mi"], ["style", "position:fixed;bottom:12px;right:12px;width:48px;height:48px;border-radius:50%;z-index:1000001;background-color:var(--theme_d);color:var(--white);text-align:center;line-height:48px;cursor:pointer;user-select:none;"]],
    innerText: "add_a_photo",
    onclick: () => {
        let port = chrome.extension.connect({
            name: "screenshot"
        });
        port.postMessage({
            request: "screenshot"
        });
        port.onMessage.addListener(function (msg) {
            let timeout, capturedScreenShot = cE({
                type: "div",
                attr: [["class", "pg-capturedScreenShot"], ["style", `position:fixed;bottom:12px;right:-384px;width:256px;height:${window.innerHeight / window.innerWidth * 256}px;border-radius:50%;z-index:1000002;background-color:var(--theme_d);color:var(--white);text-align:center;line-height:48px;cursor:pointer;user-select:none;animation:5s capturedScreenShot forwards ease-in-out;`]],
                innerHTML: `<img src='${msg}' alt='capturedScreenShot' style="width:100%" />`,
                onclick: () => {
                    let downloadLink = cE({
                        type: "a",
                        attr: [["href", msg], ["download", `截图${new Date().toLocaleString()}.${msg.substring(msg.indexOf('image/') + 6, msg.indexOf(';'))}`]]
                    });
                    downloadLink.click();
                    document.body.removeChild(capturedScreenShot);
                    clearTimeout(timeout);
                }
            });
            document.body.appendChild(capturedScreenShot);
            timeout = setTimeout(() => {
                document.body.removeChild(capturedScreenShot);
            }, 5000);
        });
    }
}));