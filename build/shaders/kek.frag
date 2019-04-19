#ifdef GL_ES
precision mediump float;
#endif

vec2 uResol = vec2(500, 500);

uniform sampler2D uTex;

varying highp vec2 vUv;

void main() { 
    
    // vec2 uv = gl_FragCoord.xy;
    // uv.xy /= uResol.xy;

    // vec3 color = vec3(0.);
    // color.r = (uv.x - 250. / uResol.x) * 2.;
    // color.r = vTexCoord0.x + 0.5;

    vec2 texcoord = vec2(1, 1);
    gl_FragColor = texture2D(uTex, vUv);
    // gl_FragColor = vec4(1, 1, 1, 1);
}