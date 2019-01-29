#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aVertPos;
uniform vec3 uTranslate;
uniform vec3 uRotate;
uniform vec3 uScale;

void main() {
    
    vec3 vp = aVertPos;

    // transform here
    
    //~~~~~~~~~~~~~~~


    // rotate here

    //~~~~~~~~~~~~~~~


    // scale here

    //~~~~~~~~~~~~~~~


    // other here


    gl_Position = vec4(vp, 1.0);
}

vec3 transform(){

}

vec3 rotate() {

}

vec3 scale () {

}