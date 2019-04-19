import ShaderLoader from "./ts/Util/ShaderLoader";

type LoadWGLTexResult = { tex: WebGLTexture, unit: number, w: number, h: number };

let gl: WebGLRenderingContext;

window.onload = () => {
    console.log("window load");

    // get GL
    let cnv = document.getElementById("cnv") as HTMLCanvasElement;
    gl = cnv.getContext("webgl", {
        premultipliedAlpha: false,
        alpha: false
    }) || cnv.getContext("experimental-webgl");

    // config gl    


    // init statics

    // shader getting  
    ShaderLoader.Init(gl);
    let frag = ShaderLoader.LoadShader("./shaders/kek.frag", gl.FRAGMENT_SHADER);
    let vert = ShaderLoader.LoadShader("./shaders/kek.vert", gl.VERTEX_SHADER);

    // shader program
    let shaderProg = gl.createProgram();
    gl.attachShader(shaderProg, vert);
    gl.attachShader(shaderProg, frag);

    // model
    let verts = [
        0.0, 0.0, 0.0,
        0.0, 0.5, 0.0,
        0.5, 0.5, 0.0,
        0.5, 0.0, 0.0
    ];
    let inds = [0, 1, 2, 0, 2, 3];
    let offset = [0, 0, 0];
    let uv = [
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0
    ];
    // for (let i = 0; i < uv.length; i++) uv[i] *= 8;

    // set VERT buffers
    let vertBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // warn

    // set INDS buffers
    let indBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // warn    

    // set UV buffer
    let uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // use prog
    gl.linkProgram(shaderProg);
    gl.useProgram(shaderProg);

    // create tex
    // let texGenRslt = genTex(32, 32);
    let texGenRslt: LoadWGLTexResult;
    loadWGLTex("media/imgs/test.png", (rslt) => { texGenRslt = rslt });

    // get locats
    let uLoc_Tex = gl.getUniformLocation(shaderProg, "uTex");
    let uLoc_Time = gl.getUniformLocation(shaderProg, "uTime");
    let uLoc_Offset = gl.getUniformLocation(shaderProg, "uOffset");
    let aLoc_VertPos = gl.getAttribLocation(shaderProg, "aVertPos");
    let aLoc_Uv = gl.getAttribLocation(shaderProg, "aUv");
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

    let c = 0;
    function loop() {
        c += 1 / 45;

        // pass time
        gl.uniform1f(uLoc_Time, c);

        // pass offset
        offset[0] = Math.sin(c) * 1 / 1.5 - 1 / 4;
        offset[1] = 0.5
        gl.uniform3fv(uLoc_Offset, offset);

        // pass tex
        gl.activeTexture(gl.TEXTURE0 + texGenRslt.unit)
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
    setTimeout(() => {
        window.requestAnimationFrame(loop);
    }, 1000);
};

function genTex(w: number, h: number) {
    let tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);

    let log = "";
    let texBytes: number[] = [];
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {

            // create pixel
            let px: number[] = [];
            px.push(0, 0, 0, 0);

            let char = "";

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
    let texData = new Uint8Array(texBytes);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, texData);
    let unit = 1;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

    return { tex: tex, unit: unit, w: w, h: h } as LoadWGLTexResult;
}

function loadWGLTex(texUrl: string, onLoad?: (rslt: LoadWGLTexResult) => void) {

    let img = new Image();
    img.src = texUrl;
    img.onload = () => {
        let unit = 2;
        let tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        if (onLoad) onLoad({ w: img.width, h: img.height, unit: unit, tex: tex });
    }
}
