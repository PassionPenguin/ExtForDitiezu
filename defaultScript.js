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
        Array.prototype.last = function () {
            return this[this.length - 1];
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
            attr: [["src", uid !== 0 ? pg.$("#um img")[0].src : "/uc_server/images/noavatar_small.gif"], ["alt", "avatar"]],
            onclick: () => {
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
                        innerHTML: `<img src="${uid !== 0 ? pg.$("#um img")[0].src.replace("small", "big") : '/uc_server/images/noavatar_big.gif'}" alt="avatar" /><div class="userName">${uid === 0 ? "未登录" : pg.$("#um strong>a")[0].innerText}</div><hr><button class="btn transparent" onclick="window.location.href='${uid === 0 ? '/member.php?mod=regditiezu.php' : pg.$("#um p>a:last-child").href}'">${uid === 0 ? "登录" : "登出"}</button>${uid === 0 ? "<div style='margin-bottom:20px;'></div>" : ("<hr>" + result.outerHTML)}`,
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

    if (document.body.classList.contains("pg_index")) (() => {
        document.documentElement.style.overflowY = "hidden";
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
            try {
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
            } catch (e) {
                console.debug(`Error: ${e}`);
            }
        } // RSS Feeds
        document.body.appendChild(contentList);
    })();

    else if (document.body.classList.contains("pg_viewthread")) (() => {
        document.documentElement.style.overflowY = "hidden";
        eval(pg.$("#wp script")[0].innerText);
        if (pg.$("#pgt .pg>*").length !== 0) {
            window.curPage = Int([...pg.$("#pgt .pg>*")].filter(i => i.tagName === "STRONG")[0].innerHTML);
            window.lastPage = [...pg.$("#pgt .pg>*:not(.nxt)")].last().innerHTML;
            lastPage = Int(lastPage.includes("...") ? lastPage.substr(4) : lastPage)
        } else {
            window.curPage = 1;
            window.lastPage = 1
        }
        let contentList = cE({
            type: "div",
            attr: [["class", "pg-dashboard"]],
            innerHTML: "<div class='container'></div>"
        }).value();
        let threadPost = [];
        threadPost = [...pg.$("div[id^='post_']>table[id^='pid']")].map((i, index) => [i.children[0].children, index]);
        let threadWrap = cE({type: "div", attr: [["class", "pg-threadWrap"]]}).value();

        threadWrap.appendChild(cE({
            type: "div",
            attr: [["class", "pg-threadSubject"]],
            innerHTML: [...pg.$("h1 :not(:last-child)")].map(i => i.outerHTML).join("").replace(/thread_subject/, "pg_subject")
        }).value());
        threadPost.forEach(e => {
            let c = e[0];
            let id = e[1];
            let thread = cE({type: "div", attr: [["class", "pg-threadPost"]]}).value();
            let authorName = pg.$(".authi .xw1")[id].innerHTML;
            let ThreadPostInfo = cE({type: "p", attr: [["class", "pg-threadPostMeta"]]}).value();
            let postInfo = cE({type: "p", attr: [["class", "pg-threadPostInfo"]]}).value();
            try {
                let avatarLevel = [...[...c][0].children[0].children].filter(i => i.tagName === "DIV").filter(i => i.classList.value === "")[0].children;
                let avatar = cE({
                    type: "img",
                    attr: [["src", avatarLevel[0].children[0].children[0].src], ["class", "pg-threadAuthorAvatar"]]
                }).value();
                let author = cE({
                    type: "p",
                    innerText: authorName,
                    attr: [["class", "pg-threadAuthorName"]]
                }).value();
                let authorLevel = cE({
                    type: "p",
                    innerText: avatarLevel[1].children[0].children[0].innerHTML,
                    attr: [["class", "pg-threadAuthorLevel"]]
                }).value();
                let authorInfo = cE({type: "div", attr: [["class", "pg-threadAuthorInfo"]]}).value();
                authorInfo.append(avatar);
                let UsrInfoBox = cE({type: "p", attr: [["class", "pg-threadAuthorInfo"]]}).value();
                UsrInfoBox.append(author);
                UsrInfoBox.append(authorLevel);
                thread.append(authorInfo);
                ThreadPostInfo.append(UsrInfoBox)
            } catch (e) {
            }
            let threadFloor = (curPage - 1) * 15 + id + 1;
            let threadPostTime = pg.$(".authi em span")[id].innerHTML;
            postInfo.append(cE({type: "span", innerText: "第" + threadFloor + "楼"}).value());
            postInfo.append(cE({type: "span", innerHTML: "发表于" + threadPostTime}).value());
            ThreadPostInfo.append(postInfo);
            thread.append(ThreadPostInfo);
            let pid = [...pg.$("#ct.wp>#postlist>div[id^='post_']")].map(i => i.id.substr(5))[id];
            thread.append(cE({
                type: "div",
                attr: [["class", "postThreadContent"]],
                innerHTML: e[0][0].children[1].children[1].innerHTML.replace(/src="*".+zoomfile="/ig, "src=\"") + e[0][1].innerHTML
            }).value());
            let threadUtil = cE({type: "div", attr: [["class", "threadUtil"]]}).value();
            let replyBTN = cE({
                type: "span",
                attr: [["class", "replyToThis"], ["pid", pid]],
                innerText: "回复"
            }).value();
            replyBTN.onclick = () => {
                window.location.href = (id !== "0" ? ("http://www.ditiezu.com/forum.php?mod=post&action=reply&tid=" + tid + "&repquote=" + replyBTN.getAttribute("pid")) : "http://www.ditiezu.com/forum.php?mod=post&action=reply&tid=" + tid);
            };
            threadUtil.append(replyBTN);
            if (document.body.innerHTML.includes("评分")) {
                let rateBTN = cE({
                    type: "span",
                    attr: [["class", "makeRate"], ["pid", pid], ["onclick", `showWindow('rate', 'forum.php?mod=misc&action=rate&tid=' + tid + '&pid=' + ${pid} + '', 'get', -1);`]],
                    innerText: "评分"
                }).value();
                threadUtil.append(rateBTN)
            }
            if (threadFloor === 1) {
                let star = cE({
                    type: "span",
                    attr: [["class", "star"], ["pid", pid], ["onclick", "document.querySelectorAll(\"#k_favorite\")[0].click();"]],
                    innerText: "收藏"
                }).value();
                threadUtil.append(star);
                let appreciate = cE({
                    type: "span",
                    attr: [["class", "appreciate"], ["pid", pid], ["onclick", "document.querySelectorAll(\"#recommend_add\")[0].click();"]],
                    innerText: "赞"
                }).value();
                threadUtil.append(appreciate);
                let dislike = cE({
                    type: "span",
                    attr: [["class", "dislike"], ["pid", pid], ["onclick", "document.querySelectorAll(\"#recommend_subtract\")[0].click();"]],
                    innerText: "踩"
                }).value();
                threadUtil.append(dislike)
            }
            thread.append(threadUtil);
            threadWrap.append(thread)
        });
        contentList.append(threadWrap);

        try {
            let loadPostList = (page) => {
                window.location.href = ("http://www.ditiezu.com/forum.php?mod=viewthread&tid=" + tid + "&page=" + page)
            };
            let pgsBox = cE({type: "div", attr: [["id", "pg-pgs"]]}).value();
            if (curPage !== 1) {
                let firstPage = cE({
                    type: "span",
                    innerText: "first_page",
                    attr: [["class", "page mi"]]
                }).value();
                firstPage.onclick = () => {
                    loadPostList(1)
                };
                pgsBox.append(firstPage);
                let prevPage = cE({
                    type: "span",
                    innerText: "chevron_left",
                    attr: [["class", "page mi"]]
                }).value();
                prevPage.onclick = () => {
                    loadPostList(curPage - 1)
                };
                pgsBox.append(prevPage)
            }
            if (curPage - 1 >= 1) {
                let page = cE({type: "span", innerText: (curPage - 1), attr: [["class", "page"]]}).value();
                page.onclick = () => {
                    loadPostList(curPage - 1)
                };
                pgsBox.append(page)
            }
            pgsBox.append(cE({type: "span", innerText: curPage}).value());
            if (curPage + 1 <= lastPage) {

                let page = cE({type: "span", innerText: (curPage + 1), attr: [["class", "page"]]}).value();
                page.onclick = () => {
                    loadPostList(curPage + 1)
                };
                pgsBox.append(page)
            }
            if (curPage !== lastPage) {
                let nextPage = cE({
                    type: "span",
                    innerText: "chevron_right",
                    attr: [["class", "page mi"]]
                }).value();
                nextPage.onclick = () => {
                    loadPostList(curPage + 1)
                };
                pgsBox.append(nextPage);
                let lPCont = cE({type: "span", innerText: "last_page", attr: [["class", "page mi"]]}).value();
                lPCont.onclick = () => {
                    loadPostList(lastPage)
                };
                pgsBox.append(lPCont)
            }
            threadWrap.append(pgsBox)
        } catch (e) {
            console.log(e);
        }
        contentList.append(cE({
            type: "p",
            attr: [["style", "text-align:center;margin:10px 0;"], ["id", "pg-copyInfo"]],
            innerText: "designed and coded by @PassionPenguin"
        }).value());
        document.body.append(cE({
            type: "div",
            attr: [["id", "newReplyToggle"], ["onclick", "loadURL(\"http://www.ditiezu.com/forum.php?mod=post&action=reply&tid=" + tid + "\")"]],
            innerText: "add"
        }).value());
        if (pg.$("#modmenu").length !== 0) {
            let ctrlMenuPopupToggle = cE({
                type: "span",
                attr: [["class", "mi theme-color ic-ctrl"]],
                innerText: "more_vert"
            }).value();
            ctrlMenuPopupToggle.onclick = () => {
                // 删除主题|升降|置顶|高亮|精华|图章|图标|关闭|移动|分类|复制|合并|分割|修复|警告|屏蔽
                pg.select("版主操作", ["关闭窗口，取消操作", "删除主题", "升降", "置顶", "高亮", "精华", "图章", "图标", "关闭", "移动", "分类", "复制", "合并", "分割", "修复", "警告", "屏蔽"], "关闭窗口，取消操作", (res) => {
                    if (res !== "关闭窗口取消操作") {
                        switch (res) {
                            case "删除主题":
                                pg.$("#modmenu a")[0].click();
                                break;
                            case "升降":
                                pg.$("#modmenu a")[1].click();
                                break;
                            case "置顶":
                                pg.$("#modmenu a")[2].click();
                                break;
                            case "高亮":
                                pg.$("#modmenu a")[3].click();
                                break;
                            case "精华":
                                pg.$("#modmenu a")[4].click();
                                break;
                            case "图章":
                                pg.$("#modmenu a")[5].click();
                                break;
                            case "图标":
                                pg.$("#modmenu a")[6].click();
                                break;
                            case "关闭":
                                pg.$("#modmenu a")[7].click();
                                break;
                            case "移动":
                                pg.$("#modmenu a")[8].click();
                                break;
                            case "分类":
                                pg.$("#modmenu a")[9].click();
                                break;
                            case "复制":
                                pg.$("#modmenu a")[10].click();
                                break;
                            case "合并":
                                pg.$("#modmenu a")[11].click();
                                break;
                            case "分割":
                                pg.$("#modmenu a")[12].click();
                                break;
                            case "修复":
                                pg.$("#modmenu a")[13].click();
                                break;
                            case "警告":
                                pg.$("#modmenu a")[14].click();
                                break;
                            case "屏蔽":
                                pg.$("#modmenu a")[15].click();
                                break;
                        }
                    }
                }, "选择了相对应的操作过后，将会有另外的窗口弹出来供版主操作");
            };
            contentList.append(ctrlMenuPopupToggle);
        }
        document.body.appendChild(contentList);
    })();

    else if ($_GET['mod'] === "space" && $_GET['do'] === "notice") (() => {
        document.documentElement.style.overflowY = "hidden";
        let contentList = cE({
            type: "div",
            attr: [["class", "pg-dashboard"]],
            innerHTML: "<div class='container'></div>"
        }).value();
        contentList.appendChild(cE({
            type: "div",
            innerHTML: `<div class="typeName"><span>通知 Notification</span><div class="icon"></div></div><div class='typeSelector'><div class="choice ${$_GET['isread'] === '1' ? '' : 'active'}" onclick="${$_GET['isread'] === '1' ? "window.location.href='/home.php?mod=space&do=notice'" : ''}">已读提醒</div><div class="choice ${$_GET['isread'] === '1' ? 'active' : ''}"  onclick="${$_GET['isread'] === '1' ? '' : "window.location.href='/home.php?mod=space&do=notice&isread=1'"}">未读提醒</div></div>`
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
                attr: [["class", "pg-notification"], ["onclick", "window.location.href='" + (pg.$(".ntc_body [target='_blank']:not(.lit)")[e[3]] !== undefined ? pg.$(".ntc_body [target='_blank']:not(.lit)")[e[3]].href : "javascript:void(0)") + "'"]]
            }).value();
            notification.append(cE({type: "img", attr: [["src", e[0]]]}).value());
            let notify = cE({type: "div", attr: [["class", "main-info"]]}).value();
            notify.append(cE({type: "p", attr: [["class", "pg-notifyContent"]], innerHTML: e[2]}).value());
            notify.append(cE({type: "p", attr: [["class", "pg-sendTime"]], innerHTML: e[1]}).value());
            notification.append(notify);
            wrap.append(notification)
        });
        contentList.append(wrap);
        document.body.appendChild(contentList);
    })();

    else if (pg.$("h1")[0].innerHTML === "Not Found" && pg.$("p")[1].innerHTML === "Additionally, a 404 Not Found\n" +
        "error was encountered while trying to use an ErrorDocument to handle the request.") {
        let contentList = cE({
            type: "div",
            attr: [["class", "pg-dashboard"]],
            innerHTML: `<div class='container'><img src='${extUrl}/images/PageNotFound.svg' alt='PageNotFound' style="display:block;margin:0 auto;width:50%;"><p style="text-align:center;font:900 24px/2 Anodina,sans-serif;color:var(--dark);">HTTP 404 File Not Found</p><p style="width:768px;margin:0 auto;font:20px/40px Anodina,sans-serif;color:var(--exdark);">${pg.$("p")[0].innerText}</p><p style="width:768px;margin:0 auto;font:18px/36px Anodina,sans-serif;color:var(--dark);">${pg.$("p")[1].innerText}</p><hr><address style="width:768px;margin:0 auto;font:18px/36px Anodina,sans-serif;color:var(--grey);">${pg.$("address")[0].innerText}</address></div>`
        }).value();
        document.body.appendChild(contentList);
    }

})()