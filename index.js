fetch('./particlesjs-config.json')
	.then(function (particlesJSON) {
		particlesJS('particles-js', particlesJSON);
	})