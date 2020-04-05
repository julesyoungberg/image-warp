#ifdef GL_ES
precision highp float;
#endif

varying vec2 uv;

uniform sampler2D image;
uniform vec2 mouse;
uniform float time, amp, freq, spot, separation, moving;

vec2 lookup(vec2 offset, float amp2) {
	return mod(
		uv + amp2 * amp * vec2(
			cos(freq * (uv.x + offset.x) + time),
			sin(freq * (uv.y + offset.x) + time)
		) + vec2(moving * time / 10.0, 0.0),
		vec2(1.0)
	);
}

void main() {
	float dist = distance(uv, mouse);
	float amp2 = pow(1.0 - dist, 2.0);
	float colorSeparation = separation * mix(amp2, 1.0, 0.5);

	vec2 orientation = vec2(1.0, 0.0);
	float a = (1.0 - min(pow(distance(uv, mouse), 5.0), 0.0));

	float r = texture2D(image, lookup(colorSeparation * orientation, amp2)).r;
	float g = texture2D(image, lookup(-colorSeparation * orientation, amp2)).g;
	float b = texture2D(image, lookup(vec2(0.0), amp2)).b;

	gl_FragColor = vec4(a * vec3(r, g, b), 1.0);
}
