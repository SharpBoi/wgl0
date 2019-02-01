#ifdef GL_ES
precision mediump float;
#endif

vec2 uResol = vec2(500, 500);

void main() { 
    
    vec2 uv = gl_FragCoord.xy;
    uv.xy /= uResol.xy;



    vec3 color = vec3(0.);
    color.r = (uv.x - 250. / uResol.x) * 4.;

    gl_FragColor = vec4(color, 1.0);
}