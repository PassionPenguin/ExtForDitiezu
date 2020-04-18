(() => {
    if (typeof window.pg !== "undefined") {
        return; // already loaded.
    }
    window.pg = {
        $: (sel) => {
            return document.querySelectorAll(sel);
        }
    }
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
    window.xhr = (mod, url, content, returnFunc) => {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open(mod.toUpperCase(), url);
        xmlHttpRequest.onreadystatechange = function () {
            // In local files, status is 0 upon success in Mozilla Firefox
            if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
                returnFunc(xmlHttpRequest);
            }
        };
        xmlHttpRequest.send(content);
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
    window.isUndefined = (variable) => {
        return typeof variable === 'undefined';
    }
    window.extUrl = `chrome-extension://${extId}`;
    window.uid = pg.$("#um .avt>a:first-child").length === 0 ? 0 : pg.$("#um .avt>a:first-child")[0].href.substring(pg.$("#um .avt>a:first-child")[0].href.indexOf("uid-") + 4, pg.$("#um .avt>a:first-child")[0].href.lastIndexOf(".html"));
    window.$_GET = {};
    if (window.location.search !== "")
        window.location.search.substr(1).split("&").forEach(i => {
            eval(`$_GET.${decodeURIComponent(i.split("=")[0])}='${decodeURIComponent(i.split("=")[1])}'`);
        });

// Basic Comp
    (() => {
        document.head.appendChild(cE({
            type: "link",
            attr: [["rel", "stylesheet"], ["href", `${extUrl}/defaultStyle.css`]]
        }).value());
        let topBar = cE({
            type: "div",
            attr: [["class", "pg-header"]],
            innerHTML: `<img src="${extUrl}/images/brand.svg" alt="Brand" class="brand"><div class="navg"><a href="/" class="mi" role="button">home</a><a href="/" class="mi" role="button">category</a></div><input class="searchBar" type="text" /><div class="account"><a href="/home.php?mod=space&do=notice" class="mi" role="button">notifications_none</a><a href="/home.php?mod=space&do=pm" class="mi" role="button">message</a><div class="avatar aboutAccont"></div></div>`
        }).value();
        topBar.children[3].appendChild(cE({
            type: "img",
            attr: [["src", pg.$("#um img")[0].src], ["alt", "avatar"]], onclick: () => {
                xhr("get", "/home.php?mod=spacecp&ac=credit&showcredit=1&inajax=1", "", (response) => {
                    let resContent, result;
                    if (uid !== 0) {
                        resContent = new DOMParser().parseFromString(response.response, "text/xml");
                        result = cE({type: "div", innerHTML: resContent.children[0].childNodes[0].data}).value();
                        result.children[0].appendChild(cE({
                            type: "li",
                            innerText: pg.$("#extcreditmenu")[0].innerText
                        }).value());
                        result.children[0].appendChild(cE({
                            type: "li",
                            innerText: pg.$("#g_upmine")[0].innerText
                        }).value());
                    }

                    let aboutMeBlank = cE({
                        type: "div",
                        attr: [["class", "pg-aboutMeBlank"]],
                        innerHTML: `<img src="${pg.$("#um img")[0].src.replace("small", "big")}" alt="avatar" /><div class="userName">${uid === 0 ? "未登录" : pg.$("#um strong>a")[0].innerText}</div><hr><button class="btn transparent" onclick="window.location.href='${uid === 0 ? '/member.php?mod=regditiezu.php' : pg.$("#um p>a:last-child").href}'">${uid === 0 ? "登录" : "登出"}</button>${uid === 0 ? "" : ("<hr>" + result.outerHTML)}`,
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
            let contentList = cE({
                type: "div",
                attr: [["class", "pg-dashboard"]],
                innerHTML: "<div class='container'></div>"
            }).value();
            {
                let focus_top = pg.$("#portal_block_58_content")[0].children;
                contentList.children[0].appendChild(cE({
                    type: "div",
                    attr: [["id", "pg-focus-topWrap"]],
                    innerHTML: "<h2>" + focus_top[0].children[0].innerHTML + "</h2><p>" + focus_top[1].innerHTML + "</p>",
                    onclick: () => {
                        window.location.href = focus_top[0].children[0].href;
                    }
                }).value());
                let focus_other_wrap = cE({type: "div", attr: [["id", "pg-focus-otherWrap"]]}).value();
                [...pg.$(".comiis_onemiddleulone.clearfix li")].map(i => i.children).forEach(e => {
                    focus_other_wrap.append(cE({
                        type: "div",
                        attr: [["class", "pg-focus-otherItem"]],
                        innerHTML: "<span class='pg-focus-otherItem-category'>" + e[1].innerHTML + "</span><span class='seperator'>|</span><span class='pg-focus-otherItem-content'>" + e[2].innerHTML + "</span><span class='pg-focus-otherItem-author'>" + e[0].children[0].innerHTML + "</span>",
                        onclick: () => {
                            window.location.href = e[2].href;
                        }
                    }).value());
                    contentList.children[0].append(focus_other_wrap);
                });
            } // Today's Focus
            {
                xhr("get", "/forum.php?mod=rss", "", (response) => {
                    let feeds = cE({type: "div", attr: [["id", "pg-indexFeeds"], ["class", "active"]]}).value();
                    const XMLParser = (feeds, res) => {
                        let items = [...res.children[0].children[0].children].filter(i => i.tagName === "item").map(i => i.children);
                        items.forEach(e => {
                            let feed = cE({type: "div", attr: [["class", "pg-feed"]]}).value();
                            e = [...e];
                            feed.onclick = () => {
                                window.location.href = e.filter(i => i.tagName === "link")[0].innerHTML.replace(/&amp;/, "&");
                            };
                            feed.append(cE({
                                type: "p",
                                innerText: e.filter(i => i.tagName === "title")[0].innerHTML,
                                attr: [["class", "pg-feed-title"]]
                            }).value());
                            let feedContent = cE({type: "div", attr: [["class", "pg-feedContent"]]}).value();
                            let description = e.filter(i => i.tagName === "description")[0].innerHTML;
                            feedContent.append(cE({
                                type: "p",
                                innerText: description.substr(9
                                    , description.length - 12).replace(/\n/ig, " ").replace(/ \s\s\s/ig, "\n").replace(/\n\n/, "\n"), /* Ignore too many breaks */
                                attr: [["class", "pg-feed-description"]]
                            }).value());
                            feed.append(feedContent);
                            let enclosure = e.filter(i => i.tagName === "enclosure");
                            if (enclosure.length !== 0 && description.substr(9
                                , description.length - 12).replace(/\n/ig, " ").replace(/ \s\s\s/ig, "\n").replace(/\n\n/, "\n") !== "")
                                feed.append(cE({
                                    type: "div",
                                    attr: [["class", "pg-feed-enclosure"], ["style", "background-image:url(\"" + enclosure[0].getAttribute("url") + "\")"]]
                                }).value());
                            else if (description.substr(9
                                , description.length - 12).replace(/\n/ig, " ").replace(/ \s\s\s/ig, "\n").replace(/\n\n/, "\n") === "")
                                feed.removeChild(feedContent);
                            else
                                feedContent.classList.add("no-image");
                            feed.append(cE({
                                type: "p",
                                innerText: e.filter(i => i.tagName === "author")[0].innerHTML + " - " + e.filter(i => i.tagName === "category")[0].innerHTML + " - " + new Date(e.filter(i => i.tagName === "pubDate")[0].innerHTML).toLocaleString("zh-CN", {timeZone: "Asia/Hong_Kong"}),
                                attr: [["class", "pg-feed-metaInfo"]]
                            }).value());
                            feeds.append(feed);
                        });
                    };
                    console.log(response, response.responseXML)
                    XMLParser(feeds, response.responseXML);
                    contentList.children[0].append(feeds);
                });
            } // RSS Feeds
            document.body.appendChild(contentList);
        })();

    else if ($_GET['mod'] === "space" && $_GET['do'] === "notice") {
        (() => {
            let contentList = cE({
                type: "div",
                attr: [["class", "pg-dashboard"]],
                innerHTML: "<div class='container'></div>"
            }).value();
            contentList.appendChild(cE({
                type: "div",
                innerHTML: `<div class='typeSelector'><div class="choice ${$_GET['isread'] === '1' ? '' : 'active'}">已读提醒</div><div class="choice ${$_GET['isread'] === '1' ? 'active' : ''}">未读提醒</div></div>`
            }).value());
            if (document.body.innerHTML.includes("暂时没有新提醒")) contentList.append(cE({
                type: "div",
                attr: [["class", "pg-app-noNewNotification"]],
                innerText: "暂时没有新提醒"
            }).value());
            let wrap = cE({type: "div", attr: [["id", "pg-app-notification"]]}).value();
            [...pg.$(".nts>dl.cl")].map((i, index) => [(i.children[0].children[0].src === undefined ? i.children[0].children[0].children[0].src : i.children[0].children[0].src), i.children[1].children[1].children[0].innerHTML, i.children[2].innerHTML, index]).forEach(e => {
                // avatarSrc - time - MainContent - index
                let notification = cE({
                    type: "div",
                    attr: [["class", "pg-notification"], ["onclick", "loadURL(\'" + pg.$(".ntc_body [target='_blank']:not(.lit)")[e[3]].href + "\')"]]
                }).value();
                notification.append(cE({type: "img", attr: [["src", e[0]]]}).value());
                let notify = cE({type: "div", attr: [["class", "main-info"]]}).value();
                notify.append(cE({type: "p", attr: [["class", "pg-sendTime"]], innerHTML: e[1]}).value());
                notify.append(cE({type: "p", attr: [["class", "pg-notifyContent"]], innerHTML: e[2]}).value());
                notification.append(notify);
                wrap.append(notification)
            });
            contentList.append(wrap);
            document.body.appendChild(contentList);
        })()
    }
})()