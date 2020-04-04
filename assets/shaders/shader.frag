#ifdef GL_ES
precision highp float;
#endif

varying vec2 uv;

uniform vec2 u_resolution;
uniform float green;
uniform sampler2D image;
#define imagePixel texture2D(image, uv)

void main() {
  // position of the pixel divided by resolution, to get normalized positions on the canvas
  vec2 st = gl_FragCoord.xy / u_resolution.xy; 

  // gl_FragColor = vec4(st.x, green, 1.0, 1.0);

  gl_FragColor = vec4(
    imagePixel.r,
    imagePixel.g,
    imagePixel.b,
    1.0
  );
}
