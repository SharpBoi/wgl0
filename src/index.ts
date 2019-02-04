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
    gl.enableVertexAttribArray(gl.getAttribLocation(shaderProg, "aVertPos"));

    // model
    let verts = [
        0.0, 0.0, 0.0,
        0.5, 0.0, 0.0,
        0.0, 0.5, 0.0
    ];
    let inds = [0, 1, 2];

    // set buffers
    let vertBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ARRAY_BUFFER, null); // warn

    let indBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // warn

    // gl.disableVertexAttribArray(gl.getAttribLocation(shaderProg, "aVertPos"));


    // draw
    gl.viewport(0, 0, cnv.width, cnv.height);
    gl.vertexAttribPointer(gl.getAttribLocation(shaderProg, "aVertPos"), 3, gl.FLOAT, false, 0, 0);

    let uTime = gl.getUniformLocation(shaderProg, "uTime");

    let c = 0;
    function loop() {
        c += 1 / 15;

        gl.uniform1f(uTime, Math.sin(c) / 2);

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawElements(gl.TRIANGLES, inds.length, gl.UNSIGNED_SHORT, 0);

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
