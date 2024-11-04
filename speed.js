// ==UserScript==
// @name         视频加速(B站，A站，油管，优酷，爱奇艺，搜狐等各大视频网站)
// @namespace    http://xyGodcyx.speed.top/
// @version      1.0.0
// @description  完美加速视频，以及自定义速度，各个网站独立加速
// @author       xyGod
// @match        *://www.bilibili.com/video/*
// @match        *://www.youtube.com/watch?v=*
// @match        *://v.youku.com/v_show/id_*
// @match        *://www.iqiyi.com/v_*
// @match        *://v.qq.com/x/cover/*
// @match        *://www.mgtv.com/b/*
// @match        *://tv.sohu.com/v/*
// @match        *://www.acfun.cn/v/*
// @match        *://www.nicovideo.jp/watch/*
// @match        *://www.dailymotion.com/video/*
// @match        *://vimeo.com/*
// @icon         https://img.ixintu.com/download/jpg/20200807/cbf8afcd485832372e5283f7d426f258_512_512.jpg
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // 样式代码块，不是主逻辑
    const style = document.createElement("style")
    document.head.appendChild(style)
    const sheet = style.sheet
    sheet.insertRule(`
    .xyGod_Icon {
        width: 40px;
        height: 40px;
        background-color: bisque;
        font-size: 18px;
        position: fixed;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 99999999;
    }
`, sheet.cssRules.length);

    sheet.insertRule(`
    .xyGod_Icon * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`, sheet.cssRules.length);

    sheet.insertRule(`
    .xyGod_Icon::after {
        content: "加速";
        width: 100%;
        height: 100%;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        color: black;
        position: absolute;
        left: 50%;
        top: 50%;
        cursor: pointer;
        transform: translate(-50%, -50%);
    }
`, sheet.cssRules.length);

    sheet.insertRule(`
    .xyGod_Icon:hover .speed-wrap {
        visibility: visible;
    }
`, sheet.cssRules.length);

    sheet.insertRule(`
    .speed-item {
        width: 80px;
        height: 30px;
        color: black;
        border: 0;
        cursor: pointer;
    }
`, sheet.cssRules.length);

    sheet.insertRule(`
    .speed-wrap {
        width: 300px;
        position: absolute;
        left: 40px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #f8c482;
        display: flex;
        justify-content: space-between;
        align-items: start;
        flex-wrap: wrap;
        gap: 10px;
        visibility: hidden;
        padding: 10px;
    }
`, sheet.cssRules.length);

    const config = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 4, 16]
    let mainVideo = document.querySelector("video")
    let curSpeed = localStorage.getItem("speed") || 1
    findVideo()

    function findVideo() {
        const id = setInterval(function () {
            if (mainVideo) {
                mainVideo.playbackRate = curSpeed
                clearInterval(id)
            }
            mainVideo = document.querySelector("video")
        }, 200)
    }

    function createIcon() {
        const icon = document.createElement('div');
        icon.className = 'xyGod_Icon';

        const speedWrapDiv = document.createElement('div');
        speedWrapDiv.className = 'speed-wrap';

        icon.appendChild(speedWrapDiv);

        document.body.appendChild(icon);
        createItem()
        createInput()
    }

    function createItem() {
        document.querySelector(".speed-wrap").addEventListener("click", function (e) {
            const target = e.target
            const speed = target.dataset.speed
            if (speed) {
                curSpeed = speed
                setSpeed(curSpeed)
            }
        })
        config.forEach(r => {
            const item = document.createElement("button")
            item.className = "speed-item"
            item.dataset.speed = r.toString()
            item.textContent = r + "x"
            document.querySelector(".speed-wrap").append(item)
        })
    }

    let input = document.createElement("input")

    function createInput() {
        input.type = "number"
        input.step = "0.01"
        input.placeholder = "0.07x~16x"
        input.className = "speed-item"
        input.style.textAlign = "center"
        input.value = curSpeed || null
        document.querySelector(".speed-wrap").append(input)
        input.addEventListener("change", function (e) {
            if (e.target.value > 16) {
                e.target.value = 16
            } else if (e.target.value < 0.07) {
                e.target.value = 0.07
            }
            curSpeed = e.target.value
            setSpeed(curSpeed)
        })
    }


    function setSpeed(val, noStorage = false) {
        if (!mainVideo) return
        mainVideo.playbackRate = val
        input.value = curSpeed
        !noStorage ? storageSpeed() : void 0
    }

    function storageSpeed() {
        localStorage.setItem("speed", curSpeed)
    }

    createIcon()
})();