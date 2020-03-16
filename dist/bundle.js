/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myblog = new _main2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blog = function () {
    function Blog() {
        _classCallCheck(this, Blog);

        this.setInitVar();
        this.registerEvents();
        this.likedSet = new Set();
    }

    _createClass(Blog, [{
        key: "setInitVar",
        value: function setInitVar() {
            this.blogList = document.querySelector(".blogList > ul");
        }
    }, {
        key: "registerEvents",
        value: function registerEvents() {
            var _this = this;

            var startBtn = document.querySelector(".start");
            var dataURL = "../data/data.json";

            startBtn.addEventListener("click", function () {
                _this.setInitData(dataURL);
            });

            this.blogList.addEventListener("click", function (_ref) {
                var target = _ref.target;

                var targetClassName = target.className;
                var postTitle = target.previousElementSibling.textContent;

                // 찜 취소 클릭한 경우, 찜하기로 다시 변경 후 목록과 뷰에서 제거
                if (targetClassName === "unlike") {
                    target.className = "like";
                    target.innerHTML = "찜하기";

                    _this.likedSet.delete(postTitle);
                } else {
                    _this.likedSet.add(postTitle); // 찜 목록에 추가

                    // 찜한 목록(div)의 클래스를 like에서 unlike로 변경하기
                    target.className = "unlike";
                    target.innerHTML = "찜 취소";
                }

                // 내 찜 목록 뷰에 보이게
                _this.updateLikedList();
            });
        }
    }, {
        key: "updateLikedList",
        value: function updateLikedList() {
            var ul = document.querySelector(".like-list > ul");
            var likedSum = "";

            // li 태그에 찜 리스트를 넣고 한 번에 innerHTML을 사용
            this.likedSet.forEach(function (v) {
                likedSum += "<li> " + v + " </li>";
            });
            ul.innerHTML = likedSum;
        }
    }, {
        key: "setInitData",
        value: function setInitData(dataURL) {
            this.getData(dataURL, this.insertPosts.bind(this));
        }
    }, {
        key: "getData",
        value: function getData(dataURL, fn) {
            var oReq = new XMLHttpRequest();

            oReq.addEventListener("load", function () {
                var list = JSON.parse(oReq.responseText).body;
                fn(list);
            });

            oReq.open('GET', dataURL);
            oReq.send();
        }
    }, {
        key: "insertPosts",
        value: function insertPosts(list) {
            var _this2 = this;

            list.forEach(function (v) {
                _this2.blogList.innerHTML += "\n                <li>\n                <a href=" + v.link + "> " + v.title + " </a>\n                <div class=\"like\">\uCC1C\uD558\uAE30</div>\n                </li>";
            });
        }
    }]);

    return Blog;
}();

exports.default = Blog;

/***/ })
/******/ ]);