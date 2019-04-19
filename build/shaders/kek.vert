#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aVertPos;
attribute vec3 aUv;

uniform float uTime;
uniform vec3 uOffset;

varying vec2 vUv;

void main() {
    
    // set varys
    vUv.st = aUv.xy;
    // vUv = vec2(0.2, 0.2);
    // vUv.s = gl_MultiTexCoord0.s;

    // set vert pos
    vec3 vp = aVertPos;
    vp += uOffset;

    gl_Position = vec4(vp, 1);
}
