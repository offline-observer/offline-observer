!function n(i,r,l){function a(t,e){if(!r[t]){if(!i[t]){var o="function"==typeof require&&require;if(!e&&o)return o(t,!0);if(s)return s(t,!0);throw(o=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",o}o=r[t]={exports:{}},i[t][0].call(o.exports,function(e){return a(i[t][1][e]||e)},o,o.exports,n,i,r,l)}return r[t].exports}for(var s="function"==typeof require&&require,e=0;e<l.length;e++)a(l[e]);return a}({1:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.options=void 0;var n=oceanwpLocalize;o.options=n},{}],2:[function(e,t,o){"use strict";var n=e("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(o,"__esModule",{value:!0}),o.fadeOutNav=o.fadeInNav=o.isSelectorValid=o.isElement=o.getSiblings=o.visible=o.offset=o.fadeToggle=o.fadeOut=o.fadeIn=o.slideToggle=o.slideUp=o.slideDown=o.wrap=void 0;var i=n(e("@babel/runtime/helpers/typeof"));o.wrap=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document.createElement("div");return e.nextSibling?e.parentNode.insertBefore(t,e.nextSibling):e.parentNode.appendChild(t),t.appendChild(e)};function r(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:300,o=window.getComputedStyle(e).display;"none"===o&&(o="block"),e.style.transitionProperty="height",e.style.transitionDuration="".concat(t,"ms"),e.style.opacity=0,e.style.display=o;var n=e.offsetHeight;e.style.height=0,e.style.opacity=1,e.style.overflow="hidden",setTimeout(function(){e.style.height="".concat(n,"px")},5),window.setTimeout(function(){e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.style.removeProperty("opacity")},t+50)}o.slideDown=r;function l(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:300;e.style.boxSizing="border-box",e.style.transitionProperty="height, margin",e.style.transitionDuration="".concat(t,"ms"),e.style.height="".concat(e.offsetHeight,"px"),e.style.marginTop=0,e.style.marginBottom=0,e.style.overflow="hidden",setTimeout(function(){e.style.height=0},5),window.setTimeout(function(){e.style.display="none",e.style.removeProperty("height"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property")},t+50)}o.slideUp=l;o.slideToggle=function(e,t){("none"===window.getComputedStyle(e).display?r:l)(e,t)};function a(e){var t={duration:300,display:null,opacity:1,callback:null};Object.assign(t,1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}),e.style.opacity=0,e.style.display=t.display||"block",setTimeout(function(){e.style.transition="".concat(t.duration,"ms opacity ease"),e.style.opacity=t.opacity},5),setTimeout(function(){e.style.removeProperty("transition"),t.callback&&t.callback()},t.duration+50)}o.fadeIn=a;function s(e){var t;"none"!==e.style.display&&(t={duration:300,display:null,opacity:0,callback:null},Object.assign(t,1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}),e.style.opacity=1,e.style.display=t.display||"block",setTimeout(function(){e.style.transition="".concat(t.duration,"ms opacity ease"),e.style.opacity=t.opacity},5),setTimeout(function(){e.style.display="none",e.style.removeProperty("transition"),t.callback&&t.callback()},t.duration+50))}o.fadeOut=s;o.fadeToggle=function(e,t){("none"===window.getComputedStyle(e).display?a:s)(e,t)};o.offset=function(e){if(!e.getClientRects().length)return{top:0,left:0};var t=e.getBoundingClientRect(),e=e.ownerDocument.defaultView;return{top:t.top+e.pageYOffset,left:t.left+e.pageXOffset}};o.visible=function(e){return!!e&&!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)};o.getSiblings=function(e){var t=[];if(!e.parentNode)return t;for(var o=e.parentNode.firstChild;o;)1===o.nodeType&&o!==e&&t.push(o),o=o.nextSibling;return t};o.isElement=function(e){return"object"===("undefined"==typeof HTMLElement?"undefined":(0,i.default)(HTMLElement))?e instanceof HTMLElement:e&&"object"===(0,i.default)(e)&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};var c,e=(c=document.createDocumentFragment(),function(e){try{c.querySelector(e)}catch(e){return!1}return!0});o.isSelectorValid=e;o.fadeInNav=function(e){var t={duration:300,visibility:"visible",opacity:1,callback:null};Object.assign(t,1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}),e.style.opacity=0,e.style.visibility=t.visibility||"visible",setTimeout(function(){e.style.transition="".concat(t.duration,"ms opacity ease"),e.style.opacity=t.opacity},5)};o.fadeOutNav=function(e){var t;"hidden"!==e.style.visibility&&(t={duration:300,visibility:"hidden",opacity:0,callback:null},Object.assign(t,1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}),e.style.opacity=1,e.style.visibility=t.visibility||"visible",setTimeout(function(){e.style.transition="".concat(t.duration,"ms opacity ease"),e.style.opacity=t.opacity},5),setTimeout(function(){e.style.visibility="hidden",e.style.removeProperty("transition"),t.callback&&t.callback()},t.duration+50))}},{"@babel/runtime/helpers/interopRequireDefault":11,"@babel/runtime/helpers/typeof":12}],3:[function(e,t,o){"use strict";var n=e("@babel/runtime/helpers/interopRequireDefault"),i=n(e("@babel/runtime/helpers/defineProperty")),r=n(e("@babel/runtime/helpers/classCallCheck")),l=n(e("@babel/runtime/helpers/classPrivateFieldSet")),s=n(e("@babel/runtime/helpers/classPrivateFieldGet")),c=e("../../constants"),u=e("../../lib/utils");function a(t,e){var o,n=Object.keys(t);return Object.getOwnPropertySymbols&&(o=Object.getOwnPropertySymbols(t),e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)),n}function d(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?a(Object(o),!0).forEach(function(e){(0,i.default)(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}var p=new WeakMap,f=new WeakMap,y=new WeakMap,v=new WeakMap,b=new WeakMap,h=new WeakMap,m=new WeakMap,g=new WeakMap,e=function e(){var a=this;(0,r.default)(this,e),p.set(this,{writable:!0,value:{header:document.querySelector("#site-header.vertical-header #site-header-inner")}}),f.set(this,{writable:!0,value:void 0}),y.set(this,{writable:!0,value:function(){(0,l.default)(a,p,d(d({},(0,s.default)(a,p)),{},{toggleMenuBtn:document.querySelector("a.vertical-toggle"),body:document.body}))}}),v.set(this,{writable:!0,value:function(){(0,s.default)(a,p).header.querySelectorAll("li.menu-item-has-children:not(.btn) > a").forEach(function(e){e.insertAdjacentHTML("beforeend",'<span class="dropdown-toggle" tabindex="0"></span>')}),(0,l.default)(a,f,"link"==c.options.verticalHeaderTarget?(0,s.default)(a,p).header.querySelectorAll("li.menu-item-has-children > a"):(0,s.default)(a,p).header.querySelectorAll(".dropdown-toggle")),new PerfectScrollbar((0,s.default)(a,p).header,{wheelSpeed:.5,suppressScrollX:!1,suppressScrollY:!1})}}),b.set(this,{writable:!0,value:function(){(0,s.default)(a,f).forEach(function(e){e.addEventListener("click",(0,s.default)(a,h)),e.addEventListener("tap",(0,s.default)(a,h))}),(0,s.default)(a,p).toggleMenuBtn.addEventListener("click",(0,s.default)(a,m)),document.addEventListener("keydown",(0,s.default)(a,g))}}),h.set(this,{writable:!0,value:function(e){e.preventDefault(),e.stopPropagation();var t=e.currentTarget,o=("link"==c.options.verticalHeaderTarget?t:t.parentNode).parentNode,e=o.lastElementChild;null!=o&&o.classList.contains("active")?(o.classList.remove("active"),(0,u.slideUp)(e,250),null!==(t=o.querySelectorAll(".menu-item-has-children.active"))&&void 0!==t&&t.forEach(function(e){e.classList.remove("active"),(0,u.slideUp)(e.querySelector("ul"),250)})):(o.classList.add("active"),(0,u.slideDown)(e,250))}}),m.set(this,{writable:!0,value:function(e){e.preventDefault(),(0,s.default)(a,p).body.classList.contains("vh-opened")?((0,s.default)(a,p).body.classList.remove("vh-opened"),(0,s.default)(a,p).toggleMenuBtn.querySelector(".hamburger").classList.remove("is-active")):((0,s.default)(a,p).body.classList.add("vh-opened"),(0,s.default)(a,p).toggleMenuBtn.querySelector(".hamburger").classList.add("is-active")),(0,s.default)(a,p).toggleMenuBtn.focus()}}),g.set(this,{writable:!0,value:function(e){var t=9===e.keyCode,o=e.shiftKey,n=27===e.keyCode,i=13===e.keyCode,r=null===(l=(0,s.default)(a,p).header)||void 0===l?void 0:l.querySelectorAll("a, span.dropdown-toggle, input, button"),l=r?r[0]:"",r=r?r[r.length-1]:"";(r.style.outline="",s.default)(a,p).body.classList.contains("vertical-header-style")&&((0,s.default)(a,p).body.classList.contains("vh-closed")||i&&document.activeElement.classList.contains("dropdown-toggle")&&document.activeElement.click(),!(0,s.default)(a,p).body.classList.contains("vh-opened"))||(n&&(e.preventDefault(),(0,s.default)(a,m).call(a,e)),i&&document.activeElement.classList.contains("dropdown-toggle")&&(0,s.default)(a,p).body.classList.contains("vh-closed")&&document.activeElement.click(),!o&&t&&r===document.activeElement&&(e.preventDefault(),l.focus()),t&&l===r&&e.preventDefault())}}),(0,s.default)(this,p).header&&((0,s.default)(this,y).call(this),(0,s.default)(this,v).call(this),(0,s.default)(this,b).call(this))};window.oceanwp=window.oceanwp||{},oceanwp.verticalHeader=new e},{"../../constants":1,"../../lib/utils":2,"@babel/runtime/helpers/classCallCheck":6,"@babel/runtime/helpers/classPrivateFieldGet":8,"@babel/runtime/helpers/classPrivateFieldSet":9,"@babel/runtime/helpers/defineProperty":10,"@babel/runtime/helpers/interopRequireDefault":11}],4:[function(e,t,o){t.exports=function(e,t){return t.get?t.get.call(e):t.value},t.exports.default=t.exports,t.exports.__esModule=!0},{}],5:[function(e,t,o){t.exports=function(e,t,o){if(t.set)t.set.call(e,o);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=o}},t.exports.default=t.exports,t.exports.__esModule=!0},{}],6:[function(e,t,o){t.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t.exports.default=t.exports,t.exports.__esModule=!0},{}],7:[function(e,t,o){t.exports=function(e,t,o){if(!t.has(e))throw new TypeError("attempted to "+o+" private field on non-instance");return t.get(e)},t.exports.default=t.exports,t.exports.__esModule=!0},{}],8:[function(e,t,o){var n=e("./classApplyDescriptorGet.js"),i=e("./classExtractFieldDescriptor.js");t.exports=function(e,t){return t=i(e,t,"get"),n(e,t)},t.exports.default=t.exports,t.exports.__esModule=!0},{"./classApplyDescriptorGet.js":4,"./classExtractFieldDescriptor.js":7}],9:[function(e,t,o){var n=e("./classApplyDescriptorSet.js"),i=e("./classExtractFieldDescriptor.js");t.exports=function(e,t,o){return t=i(e,t,"set"),n(e,t,o),o},t.exports.default=t.exports,t.exports.__esModule=!0},{"./classApplyDescriptorSet.js":5,"./classExtractFieldDescriptor.js":7}],10:[function(e,t,o){t.exports=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},t.exports.default=t.exports,t.exports.__esModule=!0},{}],11:[function(e,t,o){t.exports=function(e){return e&&e.__esModule?e:{default:e}},t.exports.default=t.exports,t.exports.__esModule=!0},{}],12:[function(e,t,o){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(e){return typeof e}:t.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t.exports.default=t.exports,t.exports.__esModule=!0,n(e)}t.exports=n,t.exports.default=t.exports,t.exports.__esModule=!0},{}]},{},[3]);