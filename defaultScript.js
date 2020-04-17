const pg = {
    $: (sel) => {
        return document.querySelectorAll(sel);
    }
};
const Int = val => {
    return parseInt(val)
};

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
    return {
        value: () => {
            return e
        },
        appendChild: (el) => {
            e.appendChild(el);
            return e;
        }
    }
};
const xhr = (mod, url, content, returnFunc) => {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(mod.toUpperCase(), url);
    xmlHttpRequest.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
            let status = xmlHttpRequest.status, res = xmlHttpRequest.response;
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                returnFunc({status: status, res: res});
            } else {
                // Oh no! There has been an error with the request!
                returnFunc({status: status, err: true});
            }
        }
    };
    xmlHttpRequest.send(content);
};

const min = val => {
    return val % 25 > 12.5 ? val + (25 - (val % 25)) : val - (val % 25)
};
if (!Array.prototype.last) {
    Array.prototype.last = () => {
        return this[this.length - 1]
    }
}
Element.prototype.cE = (el) => {
    this.appendChild(el)
    return this;
}
const isUndefined = (variable) => {
    return typeof variable === 'undefined';
}
const staticExtId = "eklcebcafbjglgimholpajfnnjokfjib";
const uid = pg.$("#um .avt>a:first-child").length === 0 ? 0 : pg.$("#um .avt>a:first-child")[0].href.substring(pg.$("#um .avt>a:first-child")[0].href.indexOf("uid-") + 4, pg.$("#um .avt>a:first-child")[0].href.lastIndexOf(".html"));

// Basic Comp
(() => {
    let topBar = cE({
        type: "div",
        attr: [["class", "pg-header"]],
        innerHTML: `<img src="chrome-extension://${staticExtId}/images/brand.svg" alt="Brand" class="brand"><div class="navg"><a href="/" class="mi" role="button">home</a><a href="/" class="mi" role="button">category</a></div><input class="searchBar" type="text" /><div class="account"><a href="/home.php?mod=space&do=notice" class="mi" role="button">notifications_none</a><a href="/home.php?mod=space&do=pm" class="mi" role="button">message</a><div class="avatar aboutAccont"></div></div>`
    }).value();
    topBar.children[3].appendChild(cE({
        type: "img",
        attr: [["src", pg.$("#um img")[0].src], ["alt", "avatar"]], onclick: () => {
            xhr("get", "/home.php?mod=spacecp&ac=credit&showcredit=1&inajax=1", "", (response) => {
                let resContent, creditContent;
                if (uid !== 0) {
                    resContent = new DOMParser().parseFromString(response.res, "text/xml");
                    creditContent = new DOMParser().parseFromString(resContent.children[0].childNodes[0].data, "text/html").children[0].children[1].children[0];
                    creditContent.appendChild(cE({type: "li", innerText: pg.$("#extcreditmenu")[0].innerText}).value());
                    creditContent.appendChild(cE({type: "li", innerText: pg.$("#g_upmine")[0].innerText}).value());
                }

                let aboutMeBlank = cE({
                    type: "div",
                    attr: [["class", "pg-aboutMeBlank"]],
                    innerHTML: `<img src="${pg.$("#um img")[0].src.replace("small", "big")}" alt="avatar" /><div class="userName">${uid === 0 ? "未登录" : pg.$("#um strong>a")[0].innerText}</div><hr><button class="btn transparent" onclick="window.location.href='${uid === 0 ? '/member.php?mod=regditiezu.php' : pg.$("#um p>a:last-child").href}'">${uid === 0 ? "登录" : "登出"}</button>${uid === 0 ? "" : ("<hr>" + creditContent.outerHTML)}`,
                    onclick: (event) => {
                        event.stopPropagation();
                    }
                });
                window.addEventListener("click", () => {
                    document.body.removeChild(aboutMeBlank.value());
                }, {once: true});
                document.body.appendChild(aboutMeBlank.value());
            });
        }
    }).value());
    document.body.appendChild(topBar);
    [...pg.$("img[alt='avatar']")].forEach(e => {
        e.onerror = (e) => {
            e.target.src = 'uc_server/images/noavatar_small.gif'
        }
    })
})();

if (document.body.classList.contains("pg_index"))
    (() => {
        let contentList = cE({type: "div", attr: [["class", "pg-dashboard"]]});
        {
            let focus_top = $("#portal_block_58_content")[0].children;
            contentList.appendChild(cE({
                type: "div",
                attr: [["id", "pg-focus-topWrap"]],
                innerHTML: "<h2>" + focus_top[0].children[0].innerHTML + "</h2><p>" + focus_top[1].innerHTML + "</p>",
                onclick: () => {
                    window.location.href = focus_top[0].children[0].href;
                }
            }));
            let focus_other_wrap = cE({type: "div", attr: [["id", "pg-focus-otherWrap"]]});
            [...$(".comiis_onemiddleulone.clearfix li")].map(i => i.children).forEach(e => {
                focus_other_wrap.append(cE({
                    type: "div",
                    attr: [["class", "pg-focus-otherItem"]],
                    innerHTML: "<span class='pg-focus-otherItem-category'>" + e[1].innerHTML + "</span><span class='seperator'>|</span><span class='pg-focus-otherItem-content'>" + e[2].innerHTML + "</span><span class='pg-focus-otherItem-author'>" + e[0].children[0].innerHTML + "</span>",
                    onclick: () => {
                        window.location.href = e[2].href;
                    }
                }));
                contentList.append(focus_other_wrap);
            });
        } // Today's Focus
        {
            let request = new XMLHttpRequest();
            request.open("GET", "http://www.ditiezu.com/forum.php?mod=rss");
            request.send();
            let wrap = cE({type: "div", attr: [["id", "pg-indexBlogPage"]]});
            request.onreadystatechange = () => {
                let feeds = cE({type: "div", attr: [["id", "pg-indexFeeds"], ["class", "active"]]});
                if (request.readyState === 4) {
                    const XMLParser = (feeds, request) => {
                        let items = [...request.responseXML.children[0].children[0].children].filter(i => i.tagName === "item").map(i => i.children);
                        items.forEach(e => {
                            let feed = cE({type: "div", attr: [["class", "pg-feed"]]});
                            e = [...e];
                            feed.onclick = () => {
                                window.location.href = e.filter(i => i.tagName === "link")[0].innerHTML.replace(/&amp;/, "&");
                            };
                            feed.append(cE({
                                type: "p",
                                innerText: e.filter(i => i.tagName === "title")[0].innerHTML,
                                attr: [["class", "pg-feed-title"]]
                            }));
                            let feedContent = cE({type: "div", attr: [["class", "pg-feedContent"]]});
                            let description = e.filter(i => i.tagName === "description")[0].innerHTML;
                            feedContent.append(cE({
                                type: "p",
                                innerText: description.substr(9
                                    , description.length - 12).replace(/\n/ig, " ").replace(/ \s\s\s/ig, "\n").replace(/\n\n/, "\n"), /* Ignore too many breaks */
                                attr: [["class", "pg-feed-description"]]
                            }));
                            feed.append(feedContent);
                            let enclosure = e.filter(i => i.tagName === "enclosure");
                            if (enclosure.length !== 0 && description.substr(9
                                , description.length - 12).replace(/\n/ig, " ").replace(/ \s\s\s/ig, "\n").replace(/\n\n/, "\n") !== "")
                                feed.append(cE({
                                    type: "div",
                                    attr: [["class", "pg-feed-enclosure"], ["style", "background-image:url(\"" + enclosure[0].getAttribute("url") + "\")"]]
                                }));
                            else if (description.substr(9
                                , description.length - 12).replace(/\n/ig, " ").replace(/ \s\s\s/ig, "\n").replace(/\n\n/, "\n") === "")
                                feed.removeChild(feedContent);
                            else
                                feedContent.classList.add("no-image");
                            feed.append(cE({
                                type: "p",
                                innerText: e.filter(i => i.tagName === "author")[0].innerHTML + " - " + e.filter(i => i.tagName === "category")[0].innerHTML + " - " + new Date(e.filter(i => i.tagName === "pubDate")[0].innerHTML).toLocaleString("zh-CN", {timeZone: "Asia/Hong_Kong"}),
                                attr: [["class", "pg-feed-metaInfo"]]
                            }));
                            feeds.append(feed);
                        });
                    };
                    XMLParser(feeds, request);
                    wrap.append(feeds);
                }
            };
            contentList.append(wrap);
        } // RSS Feeds
    })();