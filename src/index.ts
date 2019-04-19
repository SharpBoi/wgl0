import ShaderLoader from "./ts/Util/ShaderLoader";

window.onload = () => {
    console.log("window load");

    // get GL
    let cnv = document.getElementById("cnv") as HTMLCanvasElement;
    let gl = cnv.getContext("webgl") || cnv.getContext("experimental-webgl");

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
    gl.linkProgram(shaderProg);

    gl.useProgram(shaderProg);

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
        0, 0,
        0, 1,
        1, 1,
        1, 0
    ];

    // set UV buffer
    let uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // set VERT buffers
    let vertBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ARRAY_BUFFER, null); // warn

    // set INDS buffers
    let indBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // warn


    // create tex
    let tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    let texData = new Uint8Array([
        255, 0, 0, 255,
        255, 0, 0, 255,
        0, 255, 0, 255,
        0, 255, 0, 255,
    ]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, texData);
    let unit = 1;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    // get locats
    let uLoc_Tex = gl.getUniformLocation(shaderProg, "uTex");
    let uLoc_Time = gl.getUniformLocation(shaderProg, "uTime");
    let uLoc_Offset = gl.getUniformLocation(shaderProg, "uOffset");
    let aLoc_VertPos = gl.getAttribLocation(shaderProg, "aVertPos");
    let aLoc_Uv = gl.getAttribLocation(shaderProg, "aFlt");
    console.log(aLoc_VertPos)
    console.log(aLoc_Uv)
    // gl.disableVertexAttribArray(gl.getAttribLocation(shaderProg, "aVertPos"));
    
    // draw
    
    // apply tex
    
    let c = 0;
    function loop() {
        c += 1 / 15;
        
        // pass time
        gl.uniform1f(uLoc_Time, c);
        
        // pass offset
        offset[0] = Math.sin(c)
        offset[1] = 0.5
        gl.uniform3fv(uLoc_Offset, offset);
        
        // pass tex
        gl.activeTexture(gl.TEXTURE0 + unit)
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(uLoc_Tex, unit);        
        
        // draw
        gl.viewport(0, 0, cnv.width, cnv.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        gl.enableVertexAttribArray(aLoc_VertPos);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
        gl.vertexAttribPointer(aLoc_VertPos, 3, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(aLoc_Uv);
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
        gl.vertexAttribPointer(aLoc_Uv, 2, gl.FLOAT, false, 0, 0);

        gl.drawElements(gl.TRIANGLES, inds.length, gl.UNSIGNED_SHORT, 0);

        // looping loop
        window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);

    // let c = 0;
    // setInterval(() => {
    //     c += 0.001;
    //     gl.uniform1f(gl.getUniformLocation(shaderProg, "uTime"), c);

    //     gl.clearColor(0, 0, 0, 1);
    //     gl.clear(gl.COLOR_BUFFER_BIT);

    //     gl.drawElements(gl.TRIANGLES, inds.length, gl.UNSIGNED_SHORT, 0);

    // }, 1);


};
