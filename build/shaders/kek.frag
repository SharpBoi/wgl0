#ifdef GL_ES
precision mediump float;
#endif

void main() { 
    
    // vec2 st = gl_FragCoord.xy;
    // st.x /= u_resolution.x;
    // st.y /= u_resolution.y;

    // vec3 color = vec3(0.);
    // color.r = (st.x);
    // color.g = abs(sin(u_time * 8.0));

    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}