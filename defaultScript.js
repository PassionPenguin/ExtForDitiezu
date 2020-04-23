(() => {
    let pg = {
        $: (sel) => {
            return document.querySelectorAll(sel);
        }
    }
    if (pg.$("[class^='pg-'],[id^='pg-']").length > 0)
        [...pg.$("[class^='pg-'],[id^='pg-']")].forEach(i => {
            i.parentElement.removeChild(i)
        });
    let Int = val => {
        return parseInt(val)
    };
    let cE = data => {
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
    let xhr = (mod, url, content, returnFunc) => {
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
    let isUndefined = (variable) => {
        return typeof variable === 'undefined';
    }
    let extUrl = `chrome-extension://${extId}`;
    let uid = Int(document.head.innerText.substring(document.head.innerText.indexOf('discuz_uid') + 14, document.head.innerText.indexOf("'", document.head.innerText.indexOf('discuz_uid') + 14)));
    let userImageUrl;
    let $_GET = {};
    if (window.location.search !== "")
        window.location.search.substr(1).split("&").forEach(i => {
            eval(`$_GET.${decodeURIComponent(i.split("=")[0])}='${decodeURIComponent(i.split("=")[1])}'`);
        });
    let insertTag = (tag, attributes, value, editor) => {
        /**
         * Insert BB-Code => editor
         * @param {string} tag: the tagName need to be inserted
         * @param {string} attributes: the attributes need to be inserted
         *      e.g.: [["attr_1", "value_1"],["attr_2", "value_2"]]
         * @param {object} value: the value need to be in the tag:
         *      @param {boolean} replace: if true, will replace the selection text
         *      @param {string} value: string contains the value need to be in the tag, if not replace, will be added to the end of the selection
         * @param {Element} editor: <textarea> element
         *
         * @return undefined
         */

        tag = isUndefined(tag) ? "b" : tag;
        attributes = isUndefined(attributes) ? '' : attributes;
        value = isUndefined(value) ? {replace: false, value: ""} : value;
        value.replace = isUndefined(value.replace) ? false : value.replace;
        if (isUndefined(editor)) return;
        let start = editor.selectionStart, end = editor.selectionEnd, originalValue = editor.value;
        let leftHand = `${originalValue.substring(0, start)}[${tag + attributes}]`,
            innerValue = `${value.replace ? value.value : (originalValue.substring(start, end) + value.value)}`,
            rightHand = `[/${tag}]${originalValue.substring(end, originalValue.length)}`;
        editor.value = leftHand + innerValue + rightHand;
        editor.selectionStart = leftHand.length;
        editor.selectionEnd = leftHand.length + innerValue.length;
    }
    /**
     * ColorPalette
     * @type {{{name: string, colors: string[][]}[]}}
     */
    let colorPalette = [
        {
            // REF: Guangzhou MTR Official Database
            name: "Guangzhou",
            colors: [
                [
                    "#F3D03E",
                    "Line 1"
                ],
                [
                    "#00629B",
                    "Line 2"
                ],
                [
                    "#ECA154",
                    "Line 3"
                ],
                [
                    "#00843D",
                    "Line 4"
                ],
                [
                    "#C5003E",
                    "Line 5"
                ],
                [
                    "#80225F",
                    "Line 6"
                ],
                [
                    "#97D700",
                    "Line 7"
                ],
                [
                    "#008C95",
                    "Line 8"
                ],
                [
                    "#71CC98",
                    "Line 9"
                ],
                [
                    "#7D9BC1",
                    "Line 10"
                ],
                [
                    "#470A68",
                    "Line 11"
                ],
                [
                    "#59621D",
                    "Line 12"
                ],
                [
                    "#8E8C13",
                    "Line 13"
                ],
                [
                    "#81312F",
                    "Line 14"
                ],
                [
                    "#AE8A79",
                    "Line 15"
                ],
                [
                    "#9E652E",
                    "Line 16"
                ],
                [
                    "#8B84D7",
                    "Line 17"
                ],
                [
                    "#D48BC8",
                    "Line 18"
                ],
                [
                    "#BB29BB",
                    "Line 19"
                ],
                [
                    "#D9027D",
                    "Line 20"
                ],
                [
                    "#201747",
                    "Line 21"
                ],
                [
                    "#041E42",
                    "Line 22"
                ],
                [
                    "#C4D600",
                    "Guangfo Line"
                ],
                [
                    "#00B5E2",
                    "APM Line"
                ],
                [
                    "#44A729",
                    "THZ1"
                ],
                [
                    "#AD96DC",
                    "Guangzhou-Foshan Loop Line"
                ],
                [
                    "#A45A2A",
                    "Guangzhou-Foshan-Zhaoqing Line"
                ]
            ]
        },
        {
            // REF: Wikipedia, https://zh.wikipedia.org/wiki/%E4%BD%9B%E5%B1%B1%E5%9C%B0%E9%93%81
            name: "Foshan",
            colors: [
                [
                    "#C4D600",
                    "Guangfo Line (Line 1)"
                ],
                [
                    "#009900",
                    "Line 2"
                ],
                [
                    "#0000FF",
                    "Line 3"
                ],
                [
                    "#FF00FF",
                    "Line 4"
                ],
                [
                    "#FFB81D",
                    "Line 6"
                ],
                [
                    "#A25EB5",
                    "Line 9"
                ],
                [
                    "#6600CC",
                    "Line 11"
                ],
                [
                    "#32B7EA",
                    "Line 13"
                ]
            ]
        },
        {
            // REF: Wikipedia, https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%9C%B3%E5%9C%B0%E9%93%81
            name: "Shenzhen",
            colors: [
                [
                    "#00B140",
                    "Line 1 (Luobao Line)"
                ],
                [
                    "#B94700",
                    "Line 2 (Shekou Line)"
                ],
                [
                    "#00A9E0",
                    "Line 3 (Longgang Line)"
                ],
                [
                    "#DA291C",
                    "Line 4 (Longhua Line)"
                ],
                [
                    "#A05EB5",
                    "Line 5 (Huanzhong Line)"
                ],
                [
                    "#00C7B1",
                    "Line 6"
                ],
                [
                    "#0033A0",
                    "Line 7"
                ],
                [
                    "#E45DBF",
                    "Line 8"
                ],
                [
                    "#7B6469",
                    "Line 9"
                ],
                [
                    "#F8779E",
                    "Line 10"
                ],
                [
                    "#672146",
                    "Line 11"
                ],
                [
                    "#A192B2",
                    "Line 12"
                ],
                [
                    "#DE7C00",
                    "Line 13"
                ],
                [
                    "#919D9D",
                    "Line 14"
                ],
                [
                    "#84BD00",
                    "Line 15"
                ],
                [
                    "#AEE2AE",
                    "Line 16"
                ],
                [
                    "#FFD700",
                    "Line 20"
                ]
            ]
        }
    ];
    let colorUtils = {
        RGBtoHSV: (rgb) => {
            let r = rgb.r, g = rgb.g, b = rgb.b;

            let max = Math.max(r, g, b), min = Math.min(r, g, b),
                d = max - min,
                h,
                s = (max === 0 ? 0 : d / max),
                v = max / 255;

            switch (max) {
                case min:
                    h = 0;
                    break;
                case r:
                    h = (g - b) + d * (g < b ? 6 : 0);
                    h /= 6 * d;
                    break;
                case g:
                    h = (b - r) + d * 2;
                    h /= 6 * d;
                    break;
                case b:
                    h = (r - g) + d * 4;
                    h /= 6 * d;
                    break;
            }

            return {
                h: h,
                s: s,
                v: v
            };
        },
        HSVToRGB: (HSV) => {
            let r, g, b, i, f, p, q, t, h = HSV.h, s = HSV.s, v = HSV.v;
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0:
                    r = v, g = t, b = p;
                    break;
                case 1:
                    r = q, g = v, b = p;
                    break;
                case 2:
                    r = p, g = v, b = t;
                    break;
                case 3:
                    r = p, g = q, b = v;
                    break;
                case 4:
                    r = t, g = p, b = v;
                    break;
                case 5:
                    r = v, g = p, b = q;
                    break;
            }
            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        },
        HEXtoRGB: (hex) => {
            hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
            return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
        },
        HEXtoHSV: (hex) => {
            return colorUtils.RGBtoHSV(colorUtils.HEXtoRGB(hex));
        },
        RGBtoHEX: (rgb) => {
            let hex = [
                rgb.r.toString(16),
                rgb.g.toString(16),
                rgb.b.toString(16)
            ];
            hex.map(function (str, i) {
                if (str.length === 1) {
                    hex[i] = '0' + str;
                }
            });

            return hex.join('');
        },
        getColor: (element, curValue, palette, returnFunc) => {
            let colorSelector = cE({
                type: "div",
                attr: [["class", "pg-color-selector"], ["style", "position:relative;"]]
            });
            element.appendChild(colorSelector);
            let brightnessAndSaturation = cE({
                type: "div",
                attr: [["style", "margin:0 auto;position: relative;width:320px;height:180px;background:#f00"]]
            });
            let brightness = cE({
                type: "div",
                attr: [["style", "width:320px;height:180px;background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));background: -webkit-linear-gradient(to right, #fff, rgba(255, 255, 255, 0));"]]
            });
            brightnessAndSaturation.appendChild(brightness);
            brightness.appendChild(cE({
                type: "div",
                attr: [["style", "width:320px;height:180px;background: -webkit-linear-gradient(to top, #000, rgba(0, 0, 0, 0));background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));position:absolute;overflow:hidden;"]]
            }));
            let BaSCursor = cE({
                type: "div",
                attr: [["style", "width: 5px;height: 5px;border-radius: 50%;border: 2.5px solid #fff;position: absolute;transform: translate(-100%, -100%);"]]
            });
            brightness.appendChild(BaSCursor);
            colorSelector.appendChild(brightnessAndSaturation);

            let otherArea = cE({
                type: "div",
                attr: [["class", "pg-color-other"], ["style", "margin:0 auto;width:320px;height:120px;position:relative;font-size:0;"]]
            });
            let resultColor = cE({
                type: "div",
                attr: [["style", "width:40px;height:40px;top:25px;left:20px;position:absolute;border-radius:50%;border-radius:5px;border:1px solid var(--light)"]]
            });
            otherArea.appendChild(resultColor);

            let hueAndAlpha = cE({
                type: "div",
                attr: [["style", "position:absolute;right:0;top:20px;height:80px;"]]
            });
            let HueSelector = cE({
                type: "div",
                attr: [["style", "width: 240px;height: 20px;background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);background: -webkit-linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);position:relative;overflow:hidden;"]]
            })
            let HueCursor = cE({
                type: "div",
                attr: [["style", "width: 10px;height: 10px;border-radius: 50%;border: 2.5px solid #000;position: absolute;transform: translate(-100%, -50%);top:50%;left:7.5px"]]
            });
            HueSelector.appendChild(HueCursor);
            hueAndAlpha.appendChild(HueSelector);
            let AlphaSelector = cE({
                type: "div",
                attr: [["style", "margin-top:10px;width: 240px;height: 20px;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAgCAYAAABkS8DlAAAACXBIWXMAABefAAAXnwFLnDNSAAAC20lEQVR4nO3dyXLaQBSF4YsQIEEWNnPe/7XicnZmNo6rQMyptpENFJJa3YtU6v7fEkQfqSXg7G7l19PTSe6oSOXey1fiZiw/h8PC47IkSSIvo9HVu5VKca6czy+KIxn0+875m81GxuNJuqBd7sX5RVEkvW7XK386m5XOTTUaDel2Ou75260s5ouC4Oy3TH778dE53xhPJl6f97n/xu3+2z5/KZ/9N+aLz/23Tr05P9/9Xy6X9gffZIdhKD9aLefs/X4vq9WqdO5lfjOOnfMPh4Os1uuc2Py7Uq1WJY4ir/xksymd+5UfBB/fQVfH4/HjN+Ar13Kd9PyCIJBareacfzqdZLvblc695JMv52fQJTdlngEf5h645JY5Jk/g9WkAAPBfogAAAKAQBQAAAIUoAAAAKEQBAABAIQoAAAAKUQAAAFCIAgAAgEIUAAAAFKIAAACgEAUAAACFKAAAAChEAQAAQCEKAAAACoXNuJl/1QXjYKHb9mKcqAszzjNvpGXRsMs033Us5u040bLr7Ha7/AMK1is7zvR2tZ3FONM81TDMzrIYh+vDrH+1Rsm9N+NwoZsZKez7DPr41/m+KifPK3h+/m134J3rjONYhoOBc3aSJN/z/LNiczY4iiPp93rO+Wae/2Q6vZ9rMeXa5PvO8585zrM351dv1KXTbjvnGy+jUbncm+MeHx6kXq8752ftf1FuqtftOmcbs/ncKTflu/+L11en3JTZfx/Ltzfn7LBalVar5ZX/5/39O9f2Q+fzM/nmN8iVmee/TpLSuSlTYKIo8sq3KuAZ98PM8294fPfMLPvcAlzwHJj8Wk4BtXE33/o38LPE+vwJm3tQ1mVe4Fliy/x937tOKjQAAApRAAAAUIgCAACAQhQAAAAUogAAAKAQBQAAAIUoAAAAKEQBAABAIQoAAAAKUQAAAFCIAgAAgEIUAAAAFKIAAACgEAUAAACFKAAAAGgjIn8Bh3Wkkk3r1joAAAAASUVORK5CYII=');background-size:325px;position:relative;overflow:hidden;"]]
            })
            let AlphaCursor = cE({
                type: "div",
                attr: [["style", "width: 10px;height: 10px;border-radius: 50%;border: 2.5px solid #000;position: absolute;transform: translate(-100%, -50%);top:50%;left:247.5px"]]
            });
            AlphaSelector.appendChild(AlphaCursor);
            hueAndAlpha.appendChild(AlphaSelector);
            otherArea.appendChild(hueAndAlpha);
            colorSelector.appendChild(otherArea);

            let palettesBox = cE({
                type: "div",
                attr: [["style", "width:320px;margin:0 auto;font-size:0;max-height:200px;overflow:hidden scroll;"]]
            });
            let palettes = cE({
                type: "div",
                attr: [["style", "vertical-align:middle;width:280px;display:inline-block;"]]
            });

            let selectPalette = cE({
                type: "div",
                attr: [["style", "width:320px;height:250px;position:absolute;bottom:0;left:50%;transform:translate(-50%);background:var(--white);visibility:hidden;opacity:0;transition:500ms;overflow-y:scroll;"]]
            });
            let selectPaletteToggle = cE({
                type: "div",
                attr: [["style", "width:40px;display:inline-block;vertical-align:top;"]],
                innerHTML: "<span class='mi button' style='text-align:center;color:var(--dark);font:900 18px/36px \"Material Icons\",sans-serif;'>unfold_more</span>",
                onclick: () => {
                    selectPalette.style.opacity = "1";
                    selectPalette.style.visibility = "visible";
                }
            });

            palettesBox.appendChild(palettes);
            palettesBox.appendChild(selectPaletteToggle);
            colorSelector.appendChild(palettesBox);
            colorSelector.appendChild(selectPalette);
            let paletteContainer = cE({type: "div", attr: [["style", "font-size:0;"]]});
            palettes.appendChild(paletteContainer);

            colorPalette.forEach((colors, index) => {
                let colorsPreview = "";
                [0, 1, 2, 3, 4, 5].forEach(i => {
                    colorsPreview += `<div style="background:${colors.colors[i][0]};width:18px;height:18px;border-radius:4px;display:inline-block;margin:5px;vertical-align:middle;"></div>`
                });
                selectPalette.appendChild(cE({
                    type: "div",
                    attr: [["style", "padding:5px;width:calc(100% - 20px);height:28px;"], ["class", "button"]],
                    innerHTML: `<span style="font:900 16px/28px Anodina, sans-serif;margin-right:20px;color:var(--grey);width:100px;text-overflow:ellipsis;overflow: hidden;white-space:nowrap;vertical-align:middle;display:inline-block;">${colors.name}</span>${colorsPreview}`,
                    onclick: () => {
                        palettes.innerHTML = "";
                        selectPalette.style.opacity = "0";
                        selectPalette.style.visibility = "hidden";
                        let paletteContainer = cE({type: "div", attr: [["style", "font-size:0;"]]});
                        palettes.appendChild(paletteContainer);
                        colorPalette[index].colors.forEach(color => {
                            let colorBlock = cE({
                                type: "div",
                                attr: [["style", `background:${color[0]};width:18px;height:18px;border-radius:4px;display:inline-block;margin:5px;`]],
                                onclick: () => {
                                    let HSV = colorUtils.HEXtoHSV(color[0]);
                                    HueCursor.style.left = (HSV.h * 240 + 7.5) + "px";
                                    let rgb = colorUtils.HSVToRGB({
                                            h: HSV.h, s: 1, v: 1
                                        }
                                    );
                                    brightnessAndSaturation.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                                    BaSCursor.style.left = (HSV.s * 320 + 5) + "px";
                                    BaSCursor.style.top = (185 - HSV.v * 180) + "px";
                                    resultColor.style.backgroundColor = color[0];
                                    input.value = color[0];
                                }
                            });
                            paletteContainer.appendChild(colorBlock);
                            let hover = null, bcr = colorBlock.getBoundingClientRect();
                            colorBlock.onmouseenter = () => {
                                hover = cE({
                                    type: "div",
                                    attr: [["style", `position:fixed;left:${bcr.left + 9}px;top:${bcr.top - 18}px;transform:translate(-50%,-50%);width:fit-content;padding:10px 20px;background:var(--white);border-radius:5px;z-index:999999;box-shadow:rgba(0, 0, 0, 0.1) 0 0 6px, rgba(0, 0, 0, 0.05) 0 1px 6px;font: 800 14px/1 Anodina,sans-serif;`]],
                                    innerText: color[1]
                                });
                                document.body.appendChild(hover);
                            };
                            let state = false;
                            colorBlock.onmousemove = (e) => {
                                e.stopPropagation();
                                state = true;
                            };
                            colorBlock.onmouseleave = () => {
                                try {
                                    window.onmousemove = null;
                                    document.body.removeChild(hover);
                                } catch (e) {
                                }
                            }
                            window.onmousemove = () => {
                                if (!state)
                                    try {
                                        window.onmousemove = null;
                                        document.body.removeChild(hover);
                                    } catch (e) {
                                    }
                            }
                        });
                    }
                }));
            });

            let inputArea = cE({
                type: "div",
                attr: [["style", "margin:0 auto;width:320px;font-size:0;height:44px;vertical-align:middle;"]]
            });
            let input = cE({
                type: "input",
                attr: [["style", "outline:none;padding:5px;display:inline-block;width:240px;font-size:14px;vertical-align:middle;"], ["class", "button"], ["id", "inputValue"], ["placeholder", "#000000"]]
            });
            let submit = cE({
                type: "button",
                attr: [["class", "button"], ["style", "display:inline-block;width:50px;font-size:18px;height:50px;vertical-align:middle;"]],
                innerHTML: "<span class='mi'>done</span>",
                onclick: (e) => {
                    console.log(input.value);
                    writer(colorUtils.HEXtoHSV(input.value));
                }
            });
            inputArea.appendChild(input);
            inputArea.appendChild(submit);
            colorSelector.appendChild(inputArea);
            let bottomSelector = cE({
                type: "div",
                attr: [["style", "display:block;width:calc(100% - 40px);height:48px;position: fixed;bottom: 0;z-index: 1001;"]]
            });
            bottomSelector.appendChild(cE({
                type: "button",
                attr: [["class", "button"], ["style", "width:fit-content;float:right;display:inline-block;line-height:30px!important;color:var(--theme);"]],
                innerText: "确认",
                onclick: () => {
                    let hue = (parseFloat(HueCursor.style.left) - 7.5) / 240;
                    let saturation = (parseFloat(BaSCursor.style.left) - 5) / 320;
                    let brightness = (180 - (parseFloat(BaSCursor.style.top) - 5)) / 180;
                    let rgb = colorUtils.HSVToRGB({
                            h: hue, s: saturation, v: brightness
                        }
                    );
                    returnFunc("#" + colorUtils.RGBtoHEX(rgb));
                }
            }));
            colorSelector.appendChild(bottomSelector);


            brightnessAndSaturation.onclick = (event) => {
                if (event.offsetX > 320 || event.offsetX < 0 || event.offsetY > 180 || event.offsetY < 0) return;
                BaSHandler(event);
            }
            brightnessAndSaturation.onmousedown = (mouseDownEvent) => {
                if (mouseDownEvent.offsetX > 320 || mouseDownEvent.offsetX < 0 || mouseDownEvent.offsetY > 180 || mouseDownEvent.offsetY < 0) return;
                BaSHandler(mouseDownEvent);
                brightnessAndSaturation.onmousemove = (mouseOverEvent) => {
                    if (mouseOverEvent.offsetX > 320 || mouseOverEvent.offsetX < 0 || mouseOverEvent.offsetY > 180 || mouseOverEvent.offsetY < 0) return;
                    BaSHandler(mouseOverEvent);
                };
                brightnessAndSaturation.onmouseup = brightnessAndSaturation.onmouseleave = () => {
                    brightnessAndSaturation.onmousemove = () => {
                    }
                };
            }
            HueSelector.onclick = (event) => {
                if (event.target !== HueSelector) return;
                if (event.offsetX > 240 || event.offsetX < 0) return;
                HueHandler(event);
            }
            HueSelector.onmousedown = (mouseDownEvent) => {
                if (mouseDownEvent.target !== HueSelector) return;
                if (mouseDownEvent.offsetX > 240 || mouseDownEvent.offsetX < 0) return;
                HueHandler(mouseDownEvent);
                HueSelector.onmousemove = (mouseOverEvent) => {
                    if (mouseOverEvent.target !== HueSelector) return;
                    if (mouseOverEvent.offsetX > 240 || mouseOverEvent.offsetX < 0) return;
                    HueHandler(mouseOverEvent);
                };
                HueSelector.onmouseup = HueSelector.onmouseleave = () => {
                    HueSelector.onmousemove = () => {
                    }
                };
            }
            AlphaSelector.onclick = (event) => {
                if (event.target !== AlphaSelector) return;
                if (event.offsetX > 240 || event.offsetX < 0) return;
                AlphaHandler(event);
            }
            AlphaSelector.onmousedown = (mouseDownEvent) => {
                if (mouseDownEvent.target !== AlphaSelector) return;
                if (mouseDownEvent.offsetX > 240 || mouseDownEvent.offsetX < 0) return;
                AlphaHandler(mouseDownEvent);
                AlphaSelector.onmousemove = (mouseOverEvent) => {
                    if (mouseOverEvent.target !== AlphaSelector) return;
                    if (mouseOverEvent.offsetX > 240 || mouseOverEvent.offsetX < 0) return;
                    AlphaHandler(mouseOverEvent);
                    console.log(mouseOverEvent.offsetX, mouseOverEvent.offsetY, mouseOverEvent.target);
                };
                AlphaSelector.onmouseup = AlphaSelector.onmouseleave = () => {
                    AlphaSelector.onmousemove = () => {
                    }
                };
            }

            let BaSHandler = (e) => {
                let event = {};
                if (e.offsetX >= 320) event.offsetX = 320;
                else if (e.offsetX < 10) event.offsetX = 10;
                else event.offsetX = e.offsetX;
                if (e.offsetY >= 180) event.offsetY = 180;
                else if (e.offsetY < 10) event.offsetY = 10;
                else event.offsetY = e.offsetY;
                BaSCursor.style.left = event.offsetX + "px";
                BaSCursor.style.top = event.offsetY + "px";
                render();
            };

            let HueHandler = (e) => {
                let event = {};
                if (e.offsetX - 240 >= 0) event.offsetX = 240;
                else if (e.offsetX < 0) event.offsetX = 0;
                else event.offsetX = e.offsetX + 7.5;
                HueCursor.style.left = event.offsetX + "px";
                let rgb = colorUtils.HSVToRGB({
                        h: (parseFloat(HueCursor.style.left) - 7.5) / 240, s: 1, v: 1
                    }
                );
                brightnessAndSaturation.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                render();
            };

            let AlphaHandler = (e) => {
                let event = {};
                if (e.offsetX - 240 >= 0) event.offsetX = 240;
                else if (e.offsetX < 0) event.offsetX = 0;
                else event.offsetX = e.offsetX + 7.5;
                AlphaCursor.style.left = event.offsetX + "px";
                render();
            };

            let render = () => {
                let hue = (parseFloat(HueCursor.style.left) - 7.5) / 240;
                let saturation = (parseFloat(BaSCursor.style.left) - 5) / 320;
                let brightness = (180 - (parseFloat(BaSCursor.style.top) - 5)) / 180;
                let alpha = (parseFloat(AlphaCursor.style.left) - 7.5) / 240;
                let rgb = colorUtils.HSVToRGB({
                        h: hue, s: saturation, v: brightness
                    }
                );
                resultColor.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
                input.value = "#" + colorUtils.RGBtoHEX(rgb);
            };

            let writer = (HSV) => {
                let bgRgb = colorUtils.HSVToRGB({
                        h: HSV.h, s: 1, v: 1
                    }
                );
                let rgb = colorUtils.HSVToRGB({
                        h: HSV.h, s: HSV.s, v: HSV.v
                    }
                );
                brightnessAndSaturation.style.backgroundColor = `rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b})`;
                HueCursor.style.left = (HSV.h * 240 + 7.5) + "px";
                BaSCursor.style.left = (HSV.s * 320 + 5) + "px";
                BaSCursor.style.top = (185 - HSV.v * 180) + "px";
                resultColor.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},1)`;
                input.value = "#" + colorUtils.RGBtoHEX(rgb);
            }

            selectPalette.children[0].click();
        }
    };
    let WindowManager = {
        query: [],
        create: (returnFunc, opt) => {
            opt = opt || {};
            opt.mode = opt.mode || "default";
            opt.size = opt.size || "medium";
            opt.zIndex = opt.zIndex || "100000";
            opt.withMask = opt.withMask || "true";
            opt.withBlur = opt.withBlur || "true";
            opt.alignment = opt.alignment || "center";
            opt.backStyle = opt.backStyle || "default";
            opt.channelId = opt.channelId || WindowManager.query.length;
            opt.onQuit = opt.onQuit || (() => {
            });
            opt.title = opt.title || "Untitled Window";
            opt.withTitle = opt.withTitle || true;
            opt.withFooter = opt.withFooter || {
                with: true, onSubmit: () => {
                }, onCancel: () => {
                }
            };
            WindowManager.query.push(opt.channelId);
            let WindowFrame = cE({
                type: "div",
                attr: [["class", `pg-window ${opt.size} ${opt.mode} ${opt.alignment}`], ["style", `z-index: ${opt.zIndex}`], ["windowId", opt.channelId], ["onquit", opt.onQuit]]
            });
            let WindowMask;
            if (opt.withMask !== "none") WindowMask = cE({
                type: "div",
                attr: [["class", "pg-window pg-window-mask"], ["style", `z-index: ${Int(opt.zIndex) - 1};position:fixed;left:0;top:0;`], ["maskId", opt.channelId]],
                onclick: () => {
                    WindowManager.remove(opt.channelId);
                }
            });
            let content = cE({type: "div", attr: [["class", "pg-window-content"]]});
            document.body.appendChild(WindowFrame);
            if (opt.withMask !== "none")
                document.body.appendChild(WindowMask);
            if (opt.withBlur !== "none")
                try {
                    pg.$(".pg-dashboard")[0].style.filter = "blur(10px)";
                    pg.$(".pg-dashboard")[0].style.top = "0";
                    pg.$(".pg-dashboard")[0].style.height = "100%";
                } catch (e) {
                }

            WindowFrame.appendChild(content);
            let headbar = cE({type: "div", attr: [["class", "pg-window-topBar"]], innerHTML: "<div></div>"});
            content.appendChild(headbar);
            headbar.children[0].appendChild(cE({
                type: "span",
                attr: [["class", `pg-window-close ${opt.backStyle !== 'default' ? 'close' : ''}`], ["style", `z-index:${opt.zIndex + 1}`]],
                innerHTML: `${opt.backStyle === 'default' ? '<span class=\'mi\'>chevron_left</span><span>返回</span>' : '<span class="mi">close</span>'}`,
                onclick: () => {
                    WindowManager.remove(opt.channelId);
                    opt.onQuit();
                }
            }));
            if (opt.withTitle)
                headbar.children[0].appendChild(cE({
                    type: "div",
                    attr: [["class", `pg-window-title`]],
                    innerHTML: opt.title
                }));
            else
                content.classList.add("withoutTitleBar");
            let innerContent = cE({type: "div", attr: [["class", "pg-window-innerContent"]]});
            content.appendChild(innerContent);
            if (opt.withFooter.with) {
                content.appendChild(cE({type: "div", attr: [["class", "pg-window-footer"]]}));
                [...content.children].last().appendChild(cE({
                    type: "button",
                    attr: [["class", "pg-window-footer-submit button"]],
                    innerText: "确认",
                    onclick: () => {
                        opt.withFooter.onSubmit(innerContent);
                        WindowManager.remove(opt.channelId);
                    }
                }));
                [...content.children].last().appendChild(cE({
                    type: "button",
                    attr: [["class", "pg-window-footer-cancel button"]],
                    innerText: "取消",
                    onclick: () => {
                        opt.withFooter.onCancel(innerContent);
                        WindowManager.remove(opt.channelId);
                    }
                }));
            }
            returnFunc(innerContent, opt.channelId);
        }, remove: (channelId) => {
            pg.$(`[windowId='${channelId}']`)[0].classList.add("remove");
            setTimeout(() => {
                try {
                    eval(pg.$(`[windowId='${channelId}']`)[0].getAttribute("onquit"))();
                    document.body.removeChild(pg.$(`[maskId='${channelId}']`)[0]);
                } catch (e) {
                }
                document.body.removeChild(pg.$(`[windowId='${channelId}']`)[0]);
                try {
                    pg.$(".pg-dashboard")[0].style.filter = "";
                    pg.$(".pg-dashboard")[0].style.top = "";
                    pg.$(".pg-dashboard")[0].style.height = "";
                } catch (e) {
                }
            }, 500);
            WindowManager.query.filter(i => i !== channelId);
        }
    };
    let blog = [[["7", "北京区"], ["39", "武汉区"], ["23", "广州区"], ["46", "城际高铁"], ["21", "站前广场"], ["53", "成都区"], ["24", "深圳区"], ["22", "南京区"], ["38", "重庆区"], ["6", "天津区"], ["8", "上海区"], ["64", "郑州区"], ["54", "西安区"], ["51", "苏州区"], ["66", "青岛区"], ["52", "杭州区"], ["70", "昆明区"], ["50", "沈阳区"], ["18", "意见建议"], ["37", "综合区"]],
        [["23", "广州区"], ["21", "站前广场"], ["7", "北京区"], ["39", "武汉区"], ["46", "城际高铁"], ["64", "郑州区"], ["53", "成都区"], ["24", "深圳区"], ["16", "都市风情"], ["38", "重庆区"], ["52", "杭州区"], ["37", "综合区"], ["15", "地铁美食"], ["54", "西安区"], ["22", "南京区"], ["56", "佛山区"], ["18", "意见建议"], ["6", "天津区"], ["51", "苏州区"], ["66", "青岛区"]],
        [["79", "澳门区"], ["7", "北京区"], ["48", "常州区"], ["53", "成都区"], ["46", "城际高铁"], ["38", "重庆区"], ["41", "大连区"], ["31", "地铁地产"], ["150", "地铁的真相"], ["15", "地铁美食"], ["146", "地铁族网刊"], ["75", "东莞区"], ["16", "都市风情"], ["152", "都市快轨交通"], ["56", "佛山区"], ["72", "福州区"], ["23", "广州区"], ["33", "轨道收藏"], ["43", "轨道知识"], ["145", "轨交游戏"], ["76", "贵阳区"], ["55", "哈尔滨区"], ["47", "海外区"], ["52", "杭州区"], ["74", "合肥区"], ["151", "呼和浩特区"], ["45", "机车车辆"], ["148", "济南区"], ["60", "交易市场"], ["70", "昆明区"], ["78", "兰州区"], ["71", "南昌区"], ["22", "南京区"], ["73", "南宁区"], ["65", "宁波区"], ["66", "青岛区"], ["77", "厦门区"], ["8", "上海区"], ["24", "深圳区"], ["50", "沈阳区"], ["140", "石家庄区"], ["51", "苏州区"], ["36", "台湾区"], ["6", "天津区"], ["142", "温州区"], ["143", "乌鲁木齐区"], ["68", "无锡区"], ["39", "武汉区"], ["54", "西安区"], ["28", "香港区"], ["144", "徐州区"], ["18", "意见建议"], ["21", "站前广场"], ["17", "站务公告"], ["40", "长春区"], ["67", "长沙区"], ["64", "郑州区"], ["37", "综合区"]]];
    let render = () => {
        xhr("get", `/uc_server/avatar.php?uid=${uid}`, "", (res) => {
            userImageUrl = res.responseURL;
            // Basic Comp
            (() => {
                let news = pg.$("#myprompt")[0];
                document.head.appendChild(cE({
                    type: "link",
                    attr: [["rel", "stylesheet"], ["href", `${extUrl}/defaultStyle.css`]]
                }));
                let topBar = cE({
                    type: "div",
                    attr: [["class", "pg-header"]],
                    innerHTML: `<img src="${extUrl}/images/brand.svg" alt="Brand" class="brand"><div class="navg"><a href="/" class="mi" role="button">home</a><a href="javascript:void(0)" class="mi" role="button">category</a></div><input class="searchBar" type="text" /><div class="account"><a href="/home.php?mod=space&do=notice" class="mi" role="button" style="color:${news !== undefined ? news.classList.contains('new') ? 'var(--theme_d)' : 'var(--theme)' : 'var(--theme)'}">notifications${news !== undefined ? news.classList.contains('new') ? '_active' : '' : '_none'}</a><a href="/home.php?mod=space&do=pm" class="mi" role="button">message</a><div class="avatar aboutAccont"></div></div>`
                });
                topBar.children[1].children[1].onclick = () => {
                    WindowManager.create((view) => {
                        let categoryInner = cE({
                            type: "div",
                            attr: [["class", "pg-content"], ["style", "padding:0;margin:0;"]],
                            innerHTML: `<div><div class="typeName"><div class="typeNameValue"><span>分区 Category</span><div class="icon"></div></div></div><div class='typeSelector'><div class="choice active">总发帖序</div><div class="choice">平均热度序</div><div class="choice">拼音序</div></div></div><div id="pg-selectCategory"></div>`
                        });
                        [...categoryInner.children[0].children[1].children].forEach((e, index) => {
                            e.onclick = () => {
                                loadContent(index);
                            }
                        });
                        let loadContent = (id) => {
                            categoryInner.querySelector('.active').classList.remove("active");
                            categoryInner.children[0].children[1].children[id].classList.add("active");
                            if (categoryInner.children[1].children.length > 0)
                                categoryInner.children[1].removeChild(categoryInner.children[1].children[0]);
                            let result = cE({type: "div"});
                            blog[id].forEach(e => {
                                result.appendChild(cE({
                                    type: "div",
                                    attr: [["role", "button"], ["class", "button"], ["style", "    padding-left:12px;width:calc(100% - 24px);color:var(--dark);"]],
                                    onclick: () => {
                                        window.location.href = `/forum-${e[0]}-1.html`;
                                    },
                                    innerText: e[1]
                                }))
                            });
                            categoryInner.children[1].appendChild(result);
                        };
                        loadContent(0);
                        view.appendChild(categoryInner);
                    }, {withFooter: {with: false}, size: "medium", title: "选择分区"});
                };
                topBar.children[3].appendChild(cE({
                    type: "img",
                    attr: [["src", userImageUrl], ["alt", "avatar"]],
                    onclick: () => {
                        xhr("get", "/home.php?mod=spacecp&ac=credit&showcredit=1&inajax=1", "", (response) => {
                            let resContent, result;
                            if (uid !== 0) {
                                resContent = new DOMParser().parseFromString(response.response, "text/xml");
                                result = cE({type: "div", innerHTML: resContent.children[0].childNodes[0].data});
                                try {
                                    result.children[0].appendChild(cE({
                                        type: "li",
                                        innerText: pg.$("#extcreditmenu")[0].innerText
                                    }));
                                    result.children[0].appendChild(cE({
                                        type: "li",
                                        innerText: pg.$("#g_upmine")[0].innerText
                                    }));
                                } catch (e) {
                                }
                            }

                            let aboutMeBlank = cE({
                                type: "div",
                                attr: [["class", "pg-aboutMeBlank"]],
                                innerHTML: `<img src="${userImageUrl.replace(/middle/, "big")}" onclick="window.location.href='/home.php?mod=space'" style="cursor:pointer;" /><div class="userName">${uid === 0 ? "未登录" : pg.$("#um strong>a,h2.mbn a")[0].innerText}</div><hr><button class="button transparent" onclick="window.location.href='${uid === 0 ? '/member.php?mod=regditiezu.php' : [...document.querySelectorAll("a")].filter(i => i.innerText === '退出')[0].href}'">${uid === 0 ? "登录" : "登出"}</button>${uid === 0 ? "<div style='margin-bottom:20px;'></div>" : ("<hr>" + result.outerHTML)}`,
                                onclick: (event) => {
                                    event.stopPropagation();
                                }
                            });
                            window.addEventListener("click", () => {
                                document.body.removeChild(aboutMeBlank);
                            }, {once: true});
                            document.body.appendChild(aboutMeBlank);
                        });
                    }
                }));
                document.body.appendChild(topBar);
                [...pg.$("img[alt='avatar']")].forEach(e => {
                    e.onerror = (e) => {
                        e.target.src = 'uc_server/images/noavatar_small.gif'
                    }
                });
            })();

            if (document.body.classList.contains("pg_index")) (() => {
                document.documentElement.style.overflow = "hidden";
                let contentList = cE({
                    type: "div",
                    attr: [["class", "pg-dashboard"]],
                    innerHTML: "<div class='container'></div>"
                });
                {
                    let focus_top = pg.$("#portal_block_58_content")[0].children;
                    contentList.children[0].appendChild(cE({
                        type: "div",
                        attr: [["id", "pg-focus-topWrap"]],
                        innerHTML: "<h2>" + focus_top[0].children[0].innerHTML + "</h2><p>" + focus_top[1].innerHTML + "</p>",
                        onclick: () => {
                            window.location.href = focus_top[0].children[0].href;
                        }
                    }));
                    let focus_other_wrap = cE({type: "div", attr: [["id", "pg-focus-otherWrap"]]});
                    [...pg.$(".comiis_onemiddleulone.clearfix li")].map(i => i.children).forEach(e => {
                        focus_other_wrap.append(cE({
                            type: "div",
                            attr: [["class", "pg-focus-otherItem"]],
                            innerHTML: "<span class='pg-focus-otherItem-category'>" + e[1].innerHTML + "</span><span class='seperator'>|</span><span class='pg-focus-otherItem-content'>" + e[2].innerHTML + "</span><span class='pg-focus-otherItem-author'>" + e[0].children[0].innerHTML + "</span>",
                            onclick: () => {
                                window.location.href = e[2].href;
                            }
                        }));
                        contentList.children[0].append(focus_other_wrap);
                    });
                } // Today's Focus
                let categoryInner = cE({
                    type: "div",
                    attr: [["class", "pg-content"]],
                    innerHTML: `<div><div class="typeName"><div class="typeNameValue"><span>分区 Category</span><div class="icon"></div></div></div><div class='typeSelector'><div class="choice active">总发帖序</div><div class="choice">平均热度序</div><div class="choice">拼音序</div></div></div><div id="pg-selectCategory"></div>`
                });
                [...categoryInner.children[0].children[1].children].forEach((e, index) => {
                    e.onclick = () => {
                        loadContent(index);
                    }
                });
                let loadContent = (id) => {
                    categoryInner.querySelector('.active').classList.remove("active");
                    categoryInner.children[0].children[1].children[id].classList.add("active");
                    if (categoryInner.children[1].children.length > 0)
                        categoryInner.children[1].removeChild(categoryInner.children[1].children[0]);
                    let result = cE({type: "div"});
                    blog[id].forEach(e => {
                        result.appendChild(cE({
                            type: "div",
                            attr: [["role", "button"], ["class", "button"], ["style", "    padding-left:12px;width:calc(100% - 24px);color:var(--dark);"]],
                            onclick: () => {
                                window.location.href = `/forum-${e[0]}-1.html`;
                            },
                            innerText: e[1]
                        }))
                    });
                    categoryInner.children[1].appendChild(result);
                };
                loadContent(0);
                contentList.children[0].appendChild(categoryInner);
                {
                    try {
                        xhr("get", "/forum.php?mod=rss", "", (response) => {
                            let feeds = cE({type: "div", attr: [["id", "pg-indexFeeds"], ["class", "active"]]});
                            let XMLParser = (feeds, res) => {
                                let items = [...res.children[0].children[0].children].filter(i => i.tagName === "item").map(i => i.children);
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
                eval(pg.$("#wp script")[0].innerText);
                document.documentElement.style.overflow = "hidden";
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
                    attr: [["class", "pg-dashboard"]]
                });
                document.body.appendChild(contentList);
                let threadPost;
                threadPost = [...pg.$("div[id^='post_']>table[id^='pid']")].map((i, index) => [i.children[0].children, index]);
                let threadWrap = cE({type: "div", attr: [["class", "pg-threadWrap"]]});

                threadWrap.appendChild(cE({
                    type: "div",
                    attr: [["class", "pg-threadSubject"]],
                    innerHTML: [...pg.$("h1 :not(:last-child)")].map(i => i.outerHTML).join("").replace(/thread_subject/, "pg_subject")
                }));
                threadWrap.appendChild(cE({
                    type: "div",
                    attr: [["class", "pg-threadNavigation"]],
                    innerHTML: pg.$("#pt .z")[0].innerHTML.replace(/<em>›<\/em>/ig, "<em class='mi'>chevron_right</em>")
                }));
                threadPost.forEach(e => {
                    let c = e[0];
                    let id = e[1];
                    let thread = cE({type: "div", attr: [["class", "pg-threadPost"]]});
                    let authorName = pg.$(".authi .xw1")[id].innerHTML;
                    let ThreadPostInfo = cE({type: "p", attr: [["class", "pg-threadPostMeta"]]});
                    let postInfo = cE({type: "p", attr: [["class", "pg-threadPostInfo"]]});
                    try {
                        let avatarLevel = [...[...c][0].children[0].children].filter(i => i.tagName === "DIV").filter(i => i.classList.value === "")[0].children;
                        let avatar = cE({
                            type: "img",
                            attr: [["src", avatarLevel[0].children[0].children[0].src], ["class", "pg-threadAuthorAvatar"]]
                        });
                        let author = cE({
                            type: "p",
                            innerText: authorName,
                            attr: [["class", "pg-threadAuthorName"]]
                        });
                        let authorLevel = cE({
                            type: "p",
                            innerText: avatarLevel[1].children[0].children[0].innerHTML,
                            attr: [["class", "pg-threadAuthorLevel"]]
                        });
                        let authorInfo = cE({type: "div", attr: [["class", "pg-threadAuthorInfo"]]});
                        authorInfo.append(avatar);
                        let UsrInfoBox = cE({type: "p", attr: [["class", "pg-threadAuthorInfo"]]});
                        UsrInfoBox.append(author);
                        UsrInfoBox.append(authorLevel);
                        thread.append(authorInfo);
                        ThreadPostInfo.append(UsrInfoBox)
                    } catch (e) {
                    }
                    let threadFloor = (curPage - 1) * 15 + id + 1;
                    let threadPostTime = pg.$(".authi em")[id].innerText;
                    postInfo.append(cE({type: "span", innerText: "第" + threadFloor + "楼"}));
                    postInfo.append(cE({type: "span", innerHTML: "发表于" + threadPostTime}));
                    ThreadPostInfo.append(postInfo);
                    thread.append(ThreadPostInfo);
                    let pid = [...pg.$("#ct.wp>#postlist>div[id^='post_']")].map(i => i.id.substr(5))[id];
                    thread.append(cE({
                        type: "div",
                        attr: [["class", "postThreadContent"]],
                        innerHTML: e[0][0].children[1].children[1].innerHTML.replace(/src="*".+zoomfile="/ig, "src=\"") + e[0][1].innerHTML
                    }));
                    let threadUtil = cE({type: "div", attr: [["class", "threadUtil"]]});
                    let replybutton = cE({
                        type: "span",
                        attr: [["class", "reply"], ["pid", pid]],
                        innerText: "回复"
                    });
                    replybutton.onclick = () => {
                        window.location.href = (id !== "0" ? (`http://www.ditiezu.com/forum.php?mod=post&action=reply&tid=&repquote=${pid}&tid=${tid}`) : `http://www.ditiezu.com/forum.php?mod=post&action=reply&tid=${tid}`);
                    };
                    threadUtil.append(replybutton);
                    if (e[0][2].querySelectorAll(".editp").length > 0) {
                        let ratebutton = cE({
                            type: "span",
                            attr: [["class", "editThraed"], ["pid", pid], ["onclick", `window.location.href='http://www.ditiezu.com/forum.php?mod=post&action=edit&tid=${tid}&pid=${pid}'`]],
                            innerText: "编辑"
                        });
                        threadUtil.append(ratebutton)
                    }
                    if (document.body.innerHTML.includes("评分")) {
                        let ratebutton = cE({
                            type: "span",
                            attr: [["class", "makeRate"], ["pid", pid], ["onclick", `showWindow('rate', 'forum.php?mod=misc&action=rate&tid=' + tid + '&pid=' + ${pid} + '', 'get', -1);`]],
                            innerText: "评分"
                        });
                        threadUtil.append(ratebutton)
                    }

                    if (threadFloor === 1) {
                        let star = cE({
                            type: "span",
                            attr: [["class", "star"], ["pid", pid], ["onclick", "document.querySelectorAll(\"#k_favorite\")[0].click();"]],
                            innerText: "收藏"
                        });
                        threadUtil.append(star);
                        let appreciate = cE({
                            type: "span",
                            attr: [["class", "appreciate"], ["pid", pid], ["onclick", "document.querySelectorAll(\"#recommend_add\")[0].click();"]],
                            innerText: "赞"
                        });
                        threadUtil.append(appreciate);
                        let dislike = cE({
                            type: "span",
                            attr: [["class", "dislike"], ["pid", pid], ["onclick", "document.querySelectorAll(\"#recommend_subtract\")[0].click();"]],
                            innerText: "踩"
                        });
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
                    let pgsBox = cE({type: "div", attr: [["id", "pg-pgs"]]});
                    if (curPage !== 1) {
                        let firstPage = cE({
                            type: "span",
                            innerText: "first_page",
                            attr: [["class", "page mi"]]
                        });
                        firstPage.onclick = () => {
                            loadPostList(1)
                        };
                        pgsBox.append(firstPage);
                        let prevPage = cE({
                            type: "span",
                            innerText: "chevron_left",
                            attr: [["class", "page mi"]]
                        });
                        prevPage.onclick = () => {
                            loadPostList(curPage - 1)
                        };
                        pgsBox.append(prevPage)
                    }
                    if (curPage - 1 >= 1) {
                        let page = cE({type: "span", innerText: (curPage - 1), attr: [["class", "page"]]});
                        page.onclick = () => {
                            loadPostList(curPage - 1)
                        };
                        pgsBox.append(page)
                    }
                    pgsBox.append(cE({type: "span", innerText: curPage}));
                    if (curPage + 1 <= lastPage) {

                        let page = cE({type: "span", innerText: (curPage + 1), attr: [["class", "page"]]});
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
                        });
                        nextPage.onclick = () => {
                            loadPostList(curPage + 1)
                        };
                        pgsBox.append(nextPage);
                        let lPCont = cE({type: "span", innerText: "last_page", attr: [["class", "page mi"]]});
                        lPCont.onclick = () => {
                            loadPostList(lastPage)
                        };
                        pgsBox.append(lPCont)
                    }
                    threadWrap.append(pgsBox)
                } catch (e) {
                    console.log(e);
                }
                if (pg.$("#modmenu").length !== 0) {
                    let ctrlMenuPopupToggle = cE({
                        type: "span",
                        attr: [["class", "mi theme-color ic-ctrl"]],
                        innerText: "more_vert"
                    });
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

                let editor = cE({
                    type: "div",
                    attr: [["class", "simpleReplyBox"]],
                    innerHTML: `<p class="pg-reTitle">RE: ${pg.$("#thread_subject")[0].innerHTML}</p><div class="simpleEditor"><div class="toolBar"><div class="leftbar"><span class="mi">format_bold</span><span class="mi">format_strikethrough</span><span class="mi">text_fieldscolor_lens</span><span class="mi">color_lens</span><span class="mi">insert_photo</span><span class="mi">insert_link</span><span class="mi">insert_emoticon</span></div><div class="rightbar" onclick="window.location.href='http://www.ditiezu.com/forum.php?mod=post&action=reply&tid=${tid}'">高级编辑框</div></div><textarea name="simpleEditor" id="simpleEditor"></textarea><button class="button post" onclick="document.querySelector('#fastpostmessage').value=document.querySelector('#simpleEditor').value;document.querySelector('#fastpostsubmit').click();">回复</button></div>`
                });
                contentList.appendChild(editor);

                let tools = editor.children[1].children[0].children[0].children;
                let editorBox = editor.children[1].children[1];
                tools[0].onclick = () => {
                    insertTag(`b`, "", undefined, editorBox);
                }
                tools[1].onclick = () => {
                    insertTag(`s`, "", undefined, editorBox);
                }
                tools[2].onclick = () => {
                    let selStart = editorBox.selectionStart, selEnd = editorBox.selectionEnd;
                    WindowManager.create((view, colorId) => {
                        colorUtils.getColor(view, "#000", null, (color) => {
                            WindowManager.remove(colorId);
                            editorBox.focus();
                            editorBox.setSelectionRange(selStart, selEnd);
                            insertTag(`color`, `=${color}`, undefined, editorBox);
                        });
                    }, {
                        size: "small", title: "选择字体颜色", withFooter: {
                            with: false
                        }
                    });
                }
                tools[3].onclick = () => {
                    let selStart = editorBox.selectionStart, selEnd = editorBox.selectionEnd;
                    WindowManager.create((view, colorId) => {
                        colorUtils.getColor(view, "#000", null, (color) => {
                            WindowManager.remove(colorId);
                            editorBox.focus();
                            editorBox.setSelectionRange(selStart, selEnd);
                            insertTag(`backcolor`, `=${color}`, undefined, editorBox);
                        });
                    }, {
                        size: "small", title: "选择背景颜色", withFooter: {
                            with: false
                        }
                    });
                }
                tools[4].onclick = () => {
                    let selStart = editorBox.selectionStart, selEnd = editorBox.selectionEnd;
                    WindowManager.create((view) => {
                        view.appendChild(cE({
                            type: "p",
                            attr: [["style", "text-align:center;font:14px/21px Anodina,sans-serif;color:var(--dark);display:inline-block;width:100px;"]],
                            innerText: "图片地址"
                        }));
                        view.appendChild(cE({
                            type: 'input',
                            attr: [["type", "url"], ["style", "display:inline-block;width:calc(100% - 200px);"], ["placeholder", "http://www.ditiezu.com/"], ["id", "urlInput"], ["oninput", "document.querySelector('#resultImage').src=this.value"]]
                        }));
                        let resultImage = cE({
                            type: "img",
                            attr: [["style", "display:block;width:80%;margin:0 auto;margin-top:16px;"], ["src", ""], ["alt", "insertImage"], ["id", "resultImage"], ["onerror", "this.src=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cpath d='M275 175V58c0-9-7-17-17-17H142c-10 0-17 8-17 17v117c0 9 7 16 17 16h116c10 0 17-7 17-16zm-104-46l21 25 29-38 37 50H142l29-37z' fill='%239fa0a0'/%3E%3Ctext transform='translate(65 240)'%3E%3Ctspan x='0' y='0' font-size='18' font-family='sans-serif'%3E无法获取所输入的链接对应的图片%3C/tspan%3E%3Ctspan x='8.5' y='14.4' font-size='12' font-family='Anodina'%3EUnable to get the image with the url entered%3C/tspan%3E%3C/text%3E%3C/svg%3E`"]]
                        });
                        view.appendChild(resultImage);
                    }, {
                        size: "small", title: "插入图片", withFooter: {
                            with: true, onSubmit: () => {
                                editorBox.focus();
                                editorBox.setSelectionRange(selStart, selEnd);
                                insertTag(`img`, ``, pg.$('#urlInput')[0].value, editorBox);
                            }, onCancel: () => {
                            }
                        }
                    });
                }
                tools[5].onclick = () => {
                    let selStart = editorBox.selectionStart, selEnd = editorBox.selectionEnd;
                    WindowManager.create((view) => {
                        view.appendChild(cE({
                            type: "p",
                            attr: [["style", "text-align:center;font:14px/21px Anodina,sans-serif;color:var(--dark);display:inline-block;width:100px;"]],
                            innerText: "链接地址"
                        }));
                        view.appendChild(cE({
                            type: 'input',
                            attr: [["type", "url"], ["style", "display:inline-block;width:calc(100% - 200px);"], ["placeholder", "http://www.ditiezu.com/"], ["id", "urlInput"]]
                        }));
                    }, {
                        size: "small", title: "插入链接", withFooter: {
                            with: true, onSubmit: () => {
                                editorBox.focus();
                                editorBox.setSelectionRange(selStart, selEnd);
                                insertTag(`url`, `=${pg.$('#urlInput')[0].value}`, undefined, editorBox);
                            }, onCancel: () => {
                            }
                        }
                    });
                }
            })();

            else if ($_GET['mod'] === "space" && $_GET['do'] === "notice") (() => {
                document.documentElement.style.overflow = "hidden";
                let contentList = cE({
                    type: "div",
                    attr: [["class", "pg-dashboard"]], innerHTML: "<div class='pg-content'></div>"
                });
                contentList = contentList.children[0];
                contentList.appendChild(cE({
                    type: "div",
                    innerHTML: `<div class="typeName"><div class="typeNameValue"><span>通知 Notification</span><div class="icon"></div></div></div><div class='typeSelector'><div class="choice ${$_GET['isread'] === '1' ? '' : 'active'}" onclick="${$_GET['isread'] === '1' ? "window.location.href='/home.php?mod=space&do=notice'" : ''}">未读提醒</div><div class="choice ${$_GET['isread'] === '1' ? 'active' : ''}"  onclick="${$_GET['isread'] === '1' ? '' : "window.location.href='/home.php?mod=space&do=notice&isread=1'"}">已读提醒</div></div>`
                }));
                if (document.body.innerHTML.includes("暂时没有新提醒")) contentList.append(cE({
                    type: "div",
                    attr: [["class", "pg-dashboard-noNewNotification"]],
                    innerText: "暂时没有新提醒"
                }));
                let wrap = cE({type: "div", attr: [["id", "pg-dashboard-notification"]]});
                [...pg.$(".nts>dl.cl")].map((i, index) => [(i.children[0].children[0].src === undefined ? i.children[0].children[0].children[0].src : i.children[0].children[0].src), i.children[1].children[1].children[0].innerHTML, i.children[2].innerHTML, index]).forEach(e => {
                    // avatarSrc - time - MainContent - index
                    let notification = cE({
                        type: "div",
                        attr: [["class", "pg-notification"], ["onclick", "window.location.href='" + (pg.$(".ntc_body [target='_blank']:not(.lit)")[e[3]] !== undefined ? pg.$(".ntc_body [target='_blank']:not(.lit)")[e[3]].href : "javascript:void(0)") + "'"]]
                    });
                    notification.append(cE({type: "img", attr: [["src", e[0]]]}));
                    let notify = cE({type: "div", attr: [["class", "main-info"]]});
                    notify.append(cE({type: "p", attr: [["class", "pg-notifyContent"]], innerHTML: e[2]}));
                    notify.append(cE({type: "p", attr: [["class", "pg-sendTime"]], innerHTML: e[1]}));
                    notification.append(notify);
                    wrap.append(notification)
                });
                contentList.append(wrap);
                document.body.appendChild(contentList.parentElement);
            })();

            else if (pg.$("h1").length > 0 && pg.$("h1")[0].innerHTML === "Not Found" && pg.$("p")[1].innerHTML === "Additionally, a 404 Not Found\n" +
                "error was encountered while trying to use an ErrorDocument to handle the request.") {
                let contentList = cE({
                    type: "div",
                    attr: [["class", "pg-dashboard"]],
                    innerHTML: `<div class='container'><img src='${extUrl}/images/PageNotFound.svg' alt='PageNotFound' style="display:block;margin:0 auto;width:50%;"><p style="text-align:center;font:900 24px/2 Anodina,sans-serif;color:var(--dark);">HTTP 404 File Not Found</p><p style="width:768px;margin:0 auto;font:20px/40px Anodina,sans-serif;color:var(--exdark);">${pg.$("p")[0].innerText}</p><p style="width:768px;margin:0 auto;font:18px/36px Anodina,sans-serif;color:var(--dark);">${pg.$("p")[1].innerText}</p><hr><address style="width:768px;margin:0 auto;font:18px/36px Anodina,sans-serif;color:var(--grey);">${pg.$("address")[0].innerText}</address></div>`
                });
                document.body.appendChild(contentList);
            }
        });
    };
    render();
})();