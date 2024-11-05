// ==UserScript==
// @name         江西补贴性
// @namespace    http://tampermonkey.net/
// @version      2024-11-03
// @description  江西补贴性线上职业培训网课自动播放，静音，自动刷课，可以后台挂机刷课。
// @author       xygodcyx
// @match        https://jiangxi.zhipeizaixian.com/study/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhipeizaixian.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // video?class_id=38209&class_status=undefined&course_id=3083&unit_id=191506

    let video = document.querySelector("video")
    let id = setInterval(() => {
        video = document.querySelector("video")
        if (!video) return
        video.volume = 0
        video.muted = true
        if (video.paused) {
            video.play()
        }
        video.addEventListener("playing", onPlay)
        video.addEventListener("play", onPlay)
        video.addEventListener("timeupdate", onTimeupdate)
        video.addEventListener("ended", onEnded)
        video.addEventListener("pause", onPause)
        document.addEventListener("visibilitychange", function () {
            setInterval(() => {
                video.volume = 0
                video.muted = true
                video.play()
            }, 100)
        })
        clearInterval(id)
    }, 1000)
    let curId = 0

    /**
     * @param {Event} e
     * */
    function onPlay(e) {
        const params = new URLSearchParams(window.location.href)
        for (const [key, value] of params.entries()) {
            if (key !== "unit_id") continue
            curId = +value
        }
        console.log(curId)
    }

    let lastTime = 0

    function onTimeupdate(e) {
        // Math.random() > 0.96 ? video.currentTime += 1 : void 0
        // Math.random() > 0.96 ? video.playbackRate = 16 : video.playbackRate = 1
    }

    function onPause(e) {
        video.muted = true
        video.play()
    }

    setInterval(function () {
        if (video) {
            video.muted = true
            video.play()
        }
    }, 1000)

    function onEnded(e) {
        // const nextId = curId + 1
        // const params = new URLSearchParams(window.location.href)
        // const arrparams = [...new Set(params)]
        // const temp = arrparams.slice(0, arrparams.length - 1)
        // temp.push(["unit_id", nextId])
        // const path = temp.map((t) => t.join("=")).join("&")
        // window.location = path
        setTimeout(function () {
            document.querySelector(".next_button___YGZWZ").click()
        }, 2000)
    }

})();