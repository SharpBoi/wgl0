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
var gl;
window.onload = function () {
    console.log("window load");
    // get GL
    var cnv = document.getElementById("cnv");
    gl = cnv.getContext("webgl", {
        premultipliedAlpha: false,
        alpha: false
    }) || cnv.getContext("experimental-webgl");
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
    // model
    var verts = [
        0.0, 0.0, 0.0,
        0.0, 0.5, 0.0,
        0.5, 0.5, 0.0,
        0.5, 0.0, 0.0
    ];
    var inds = [0, 1, 2, 0, 2, 3];
    var offset = [0, 0, 0];
    var uv = [
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0
    ];
    // for (let i = 0; i < uv.length; i++) uv[i] *= 8;
    // set VERT buffers
    var vertBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // warn
    // set INDS buffers
    var indBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // warn    
    // set UV buffer
    var uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // use prog
    gl.linkProgram(shaderProg);
    gl.useProgram(shaderProg);
    // create tex
    // let texGenRslt = genTex(32, 32);
    var texGenRslt;
    loadWGLTex("media/imgs/test.png", function (rslt) { texGenRslt = rslt; });
    // get locats
    var uLoc_Tex = gl.getUniformLocation(shaderProg, "uTex");
    var uLoc_Time = gl.getUniformLocation(shaderProg, "uTime");
    var uLoc_Offset = gl.getUniformLocation(shaderProg, "uOffset");
    var aLoc_VertPos = gl.getAttribLocation(shaderProg, "aVertPos");
    var aLoc_Uv = gl.getAttribLocation(shaderProg, "aUv");
    console.log(aLoc_VertPos);
    console.log(aLoc_Uv);
    // enabling attrs
    gl.enableVertexAttribArray(aLoc_VertPos);
    gl.enableVertexAttribArray(aLoc_Uv);
    // point attrs to each context
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuf);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
    gl.vertexAttribPointer(aLoc_VertPos, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.vertexAttribPointer(aLoc_Uv, 2, gl.FLOAT, false, 0, 0);
    var c = 0;
    function loop() {
        c += 1 / 45;
        // pass time
        gl.uniform1f(uLoc_Time, c);
        // pass offset
        offset[0] = Math.sin(c) * 1 / 1.5 - 1 / 4;
        offset[1] = 0.5;
        gl.uniform3fv(uLoc_Offset, offset);
        // pass tex
        gl.activeTexture(gl.TEXTURE0 + texGenRslt.unit);
        gl.bindTexture(gl.TEXTURE_2D, texGenRslt.tex);
        gl.uniform1i(uLoc_Tex, texGenRslt.unit);
        // draw
        gl.viewport(0, 0, cnv.width, cnv.height);
        gl.clearColor(0, 0, 0, 1);
        // gl.colorMask(false, false, false, true)
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuf);
        // gl.enableVertexAttribArray(aLoc_Uv);
        // gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
        // gl.vertexAttribPointer(aLoc_Uv, 2, gl.FLOAT, false, 0, 0);
        // gl.drawElements(gl.TRIANGLES, inds.length, gl.UNSIGNED_SHORT, 0);
        gl.drawElements(gl.TRIANGLES, inds.length, gl.UNSIGNED_SHORT, 0);
        // looping loop
        window.requestAnimationFrame(loop);
    }
    setTimeout(function () {
        window.requestAnimationFrame(loop);
    }, 1000);
};
function genTex(w, h) {
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    var log = "";
    var texBytes = [];
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            // create pixel
            var px = [];
            px.push(0, 0, 0, 0);
            var char = "";
            // set default px
            px[0] = 0; //r
            px[1] = 255; //g
            px[2] = 0; //b
            px[3] = 255; //a
            char = "g";
            // set middle line px
            if (y === x) {
                px[0] = 255; //r
                px[1] = 0; //g
                px[2] = 0; //b
                px[3] = 255; //a
                char = "r";
            }
            if (x === w - 1 && y === 0) {
                px[0] = 0; //r
                px[1] = 0; //g
                px[2] = 255; //b
                px[3] = 255; //a
                char = "b";
            }
            if (x === 0 && y === h - 1) {
                px[0] = 0; //r
                px[1] = 255; //g
                px[2] = 255; //b
                px[3] = 255; //a
                char = "y";
            }
            log += char;
            texBytes = texBytes.concat(px);
        }
        log += "\n";
    }
    console.log(log);
    var texData = new Uint8Array(texBytes);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, texData);
    var unit = 1;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    return { tex: tex, unit: unit, w: w, h: h };
}
function loadWGLTex(texUrl, onLoad) {
    var img = new Image();
    img.src = texUrl;
    img.onload = function () {
        var unit = 2;
        var tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        if (onLoad)
            onLoad({ w: img.width, h: img.height, unit: unit, tex: tex });
    };
}


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