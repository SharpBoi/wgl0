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

    let vertBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ARRAY_BUFFER, null); // warn
    
    let indBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // warn

    // gl.disableVertexAttribArray(gl.getAttribLocation(shaderProg, "aVertPos"));

    // gl.uniform1f(gl.getUniformLocation(shaderProg, "uTime"), 0);

    // draw
    gl.viewport(0, 0, cnv.width, cnv.height);
    let c = 0;
    setInterval(() => {
        c+=0.001;
        gl.clearColor(c, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);


        gl.vertexAttribPointer(gl.getAttribLocation(shaderProg, "aVertPos"), 3, gl.FLOAT, false, 0, 0);
        gl.drawElements(gl.TRIANGLES, inds.length, gl.UNSIGNED_SHORT, 0); 
    }, 1);

};
