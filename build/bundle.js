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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderLoader_1 = __importDefault(__webpack_require__(/*! ./ts/Util/ShaderLoader */ "./src/ts/Util/ShaderLoader.ts"));
window.onload = function () {
    console.log("window load");
    // get GL
    var cnv = document.getElementById("cnv");
    var gl = cnv.getContext("webgl") || cnv.getContext("experimental-webgl");
    // config gl    
    // init statics
    // shader getting
    ShaderLoader_1.default.Init(gl);
    var frag = ShaderLoader_1.default.LoadShader("./shaders/kek.frag", gl.FRAGMENT_SHADER);
    var vert = ShaderLoader_1.default.LoadShader("./shaders/kek.vert", gl.VERTEX_SHADER);
    // shader program
    var shaderProg = gl.createProgram();
    gl.attachShader(shaderProg, vert);
    gl.attachShader(shaderProg, frag);
    gl.linkProgram(shaderProg);
    gl.useProgram(shaderProg);
    gl.enableVertexAttribArray(gl.getAttribLocation(shaderProg, "aVertPos"));
    // model
    var verts = [
        0.0, 0.0, 0.0,
        0.5, 0.0, 0.0,
        0.0, 0.5, 0.0
    ];
    var inds = [0, 1, 2];
    var vertBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ARRAY_BUFFER, null); // warn
    var indBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // warn
    // gl.disableVertexAttribArray(gl.getAttribLocation(shaderProg, "aVertPos"));
    // gl.uniform1f(gl.getUniformLocation(shaderProg, "uTime"), 0);
    // draw
    gl.viewport(0, 0, cnv.width, cnv.height);
    var c = 0;
    setInterval(function () {
        c += 0.001;
        gl.clearColor(c, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.vertexAttribPointer(gl.getAttribLocation(shaderProg, "aVertPos"), 3, gl.FLOAT, false, 0, 0);
        gl.drawElements(gl.TRIANGLES, inds.length, gl.UNSIGNED_SHORT, 0);
    }, 1);
};


/***/ }),

/***/ "./src/ts/Util/ShaderLoader.ts":
/*!*************************************!*\
  !*** ./src/ts/Util/ShaderLoader.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ShaderLoader = /** @class */ (function () {
    function ShaderLoader() {
    }
    ShaderLoader.Init = function (Gl) {
        this.gl = Gl;
        this.req = new XMLHttpRequest();
    };
    ShaderLoader.LoadShaderASync = function (url, onLoad, shaderType) {
        var _this = this;
        if (shaderType === void 0) { shaderType = this.gl.FRAGMENT_SHADER; }
        this.req.open("GET", url, true);
        this.req.onreadystatechange = function () {
            if (_this.req.status === 200) {
                var content = _this.req.responseText;
                var shader = _this.gl.createShader(shaderType);
                _this.gl.shaderSource(shader, content);
                _this.gl.compileShader(shader);
                onLoad(shader);
            }
        };
        this.req.send();
    };
    ShaderLoader.LoadShader = function (url, shaderType) {
        if (shaderType === void 0) { shaderType = this.gl.FRAGMENT_SHADER; }
        this.req.open("GET", url, false);
        this.req.send();
        var shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, this.req.responseText);
        this.gl.compileShader(shader);
        return shader;
    };
    ShaderLoader.extFrag = ".frag";
    ShaderLoader.extVert = ".vert";
    return ShaderLoader;
}());
exports.default = ShaderLoader;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map