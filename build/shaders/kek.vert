#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aVertPos;
uniform float uTime;

varying vec2 vTexCoord0;

void main() {
    
    vec3 vp = aVertPos;

    vp.x += uTime;

    gl_Position = vec4(vp, 1.0);

    // vTexCoord0 = gl_MultiTexCoord0;
}