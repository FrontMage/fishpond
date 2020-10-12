// ==UserScript==
// @name         fish pond
// @namespace    https://wx.qq.com/
// @version      0.1
// @description  nlp plugin for web wechat
// @author       You
// @match        https://wx.qq.com/*
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function () {
  'use strict';
  function bindListener() {
    $(
      '#chatArea > div.scroll-wrapper.box_bd.chat_bd.scrollbar-dynamic > div.box_bd.chat_bd.scrollbar-dynamic.scroll-content'
    ).bind('DOMSubtreeModified', function (e) {
      if (e.target.tagName == 'PRE') {
        console.log('New message:');
        console.log(e.target.innerHTML);
        fetch(
          `http://localhost:8000/sentiment/?sentence=${e.target.innerHTML}`,
          { mode: 'cors' }
        )
          .then((response) => response.json())
          .then((data) => {
            $(e.target).parent().append(`<p>情感：${data}<p>`);
          });
      }
    });
  }
  setInterval(() => {
    let events = $._data(
      $(
        '#chatArea > div.scroll-wrapper.box_bd.chat_bd.scrollbar-dynamic > div.box_bd.chat_bd.scrollbar-dynamic.scroll-content'
      )[0],
      'events'
    );
    if (!events) {
      bindListener();
    }
  }, 1000);
  // Your code here...
})();
