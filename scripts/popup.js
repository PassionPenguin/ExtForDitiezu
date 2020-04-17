let content = document.querySelector(".content");
chrome.storage.sync.get(["userAgent", "overrideRequest"], (items) => {
    chrome.tabs.getSelected(null, (tab) => {
        if (["ditiezu.com", "localhost"].indexOf(tab.url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0]) === -1) content.innerHTML = `<div class="notDitiezuPageAlert"><img src="../images/NotDitiezuPage.svg" alt="notDitiezuPage" />${chrome.i18n.getMessage('notDitiezuPage')}</div>`;
        else {
            // {
            //     let userAgentPreference = cE({
            //         type: "div",
            //         attr: [["class", "userPreference"]],
            //         innerHTML: `<div class='prefName'>${chrome.i18n.getMessage('overrideRequest')}</div><div class='prefContent'></div>`
            //     });
            //     userAgentPreference.children[1].appendChild(cE({
            //         type: "pg-switchToggle", innerHTML: "<span></span>", onclick: (event) => {
            //             if (event.target.getAttribute("selected") === "true") {
            //                 chrome.storage.sync.set({"overrideRequest": "false"}, () => {
            //                     interceptRequest();
            //                 });
            //                 event.target.setAttribute("selected", "false");
            //             } else {
            //                 chrome.storage.sync.set({"overrideRequest": "true"}, () => {
            //                     interceptRequest();
            //                 });
            //                 event.target.setAttribute("selected", "true");
            //             }
            //         }, attr: [["selected", items.overrideRequest === "true" ? "true" : "false"]]
            //     }))
            //     content.appendChild(userAgentPreference);
            // }
            // {
            //     let userAgentPreference = cE({
            //         type: "div",
            //         attr: [["class", "userPreference"]],
            //         innerHTML: `<div class='prefName'>${chrome.i18n.getMessage('requestMode')}</div><div class='prefContent'></div>`
            //     });
            //     [{
            //         ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
            //         mode: "desktop",
            //         string: chrome.i18n.getMessage('desktopRequest')
            //     }, {
            //         ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
            //         mode: "mobile",
            //         string: chrome.i18n.getMessage('mobileRequest')
            //     }].forEach((e, index) => {
            //         userAgentPreference.children[1].appendChild(cE({
            //             type: "div",
            //             attr: [["class", `prefSelector ${(e.ua === items.userAgent || ((items.userAgent === null || items.userAgent === undefined) && index === 0)) ? "active" : ""}`]],
            //             innerText: e.string,
            //             onclick: (event) => {
            //                 userAgentPreference.children[1].querySelector('.active').classList.remove("active");
            //                 event.target.classList.add('active');
            //                 chrome.storage.sync.set({"userAgent": e.ua}, () => {
            //                     interceptRequest()
            //                 });
            //             }
            //         }))
            //     });
            //     content.appendChild(userAgentPreference);
            // }
        }
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