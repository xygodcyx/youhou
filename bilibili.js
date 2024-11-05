// ==UserScript==
// @name         Bilibilii增强
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  增强哔哩哔哩的使用体验，优化笔记的使用
// @author       You
// @match        *://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
    .note-detail::-webkit-scrollbar {
    width: 18px !important;
      }
      .note-detail::-webkit-scrollbar-thumb {
    background: #d0cfcf !important;
}
.note-detail::-webkit-scrollbar-track {
    background: #5e5b5b !important;
}
    `)
})();