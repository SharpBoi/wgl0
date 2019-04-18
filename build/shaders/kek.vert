#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aVertPos;

uniform float uTime;
uniform vec3 uOffset;

varying vec2 vTexCoord0;
varying vec2 vUv;

void main() {
    
    // set varys
    vUv = vec2(1, 1);

    vec3 vp = aVertPos;
    vp += uOffset;

    gl_Position = vec4(vp, 1);

    // vTexCoord0 = gl_MultiTexCoord0;
}
