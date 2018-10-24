(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const animationManager = {
    elements: [],
    windowHeight: 0,

    init: function () {
        this.elements = document.getElementsByClassName('animation');
        this.windowHeight = window.innerHeight;
        this.addEventHandlers();
    },
    addEventHandlers: function () {
        // clear first 
        window.removeEventListener("scroll", this.checkPos);
        window.removeEventListener("resize", this.init);
        // reapply
        window.addEventListener("scroll", this.checkPos);
        window.addEventListener("resize", this.init);
    },
    checkPos: function () {
        for (var i = 0; i < animationManager.elements.length; i++) {
            var posFromTop = animationManager.elements[i].getBoundingClientRect().top;
            if (posFromTop - animationManager.windowHeight <= 0 - animationManager.windowHeight / 3) {
                animationManager.elements[i].classList.add('active');
            } else {
                animationManager.elements[i].classList.remove('active');
            }
        }
    }
};
document.addEventListener("DOMContentLoaded", evt => {
    animationManager.init();
});

},{}]},{},[1]);
