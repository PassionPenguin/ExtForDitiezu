let content = document.querySelector(".content");
chrome.storage.sync.get(["userAgent", "overrideRequest"], (items) => {
    chrome.tabs.getSelected(null, (tab) => {
        if (["ditiezu.com", "localhost"].indexOf(tab.url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0]) === -1) content.innerHTML = `<div class="notDitiezuPageAlert"><img src="../images/PageNotFound.svg" alt="PageNotFound" />${chrome.i18n.getMessage('notDitiezuPage')}</div>`;
        else content.innerHTML = `<div class="notDitiezuPageAlert"><img src="../images/Page.svg" alt="Page" />${chrome.i18n.getMessage('inProgress')}</div>`;
    });
});


window.$ = e => {
    return document.querySelectorAll(e)
};
window.Int = val => {
    return parseInt(val)
};
window.cE = data => {
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
    return e
};
window.min = val => {
    return val % 25 > 12.5 ? val + (25 - (val % 25)) : val - (val % 25)
};
if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1]
    }
}