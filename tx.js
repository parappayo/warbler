var tx = tx || {};

tx.invert = (img) => {
	for (let i = 0; i < img.data.length; i += 4) {
		img.data[i + 0] = 1 - img.data[i + 0];
		img.data[i + 0] = 1 - img.data[i + 1];
		img.data[i + 0] = 1 - img.data[i + 2];
	}
};

tx.interlace = (img) => {
	for (let i = 0; i < img.data.length; i += 4) {
		let y = Math.floor(i / (img.width * 4));
		let dx = 0;
		if (y % 2 == 0) {
			dx = 20;
		}

		img.data[i + 0] = img.data[i + 0 + dx];
		img.data[i + 1] = img.data[i + 1 + dx];
		img.data[i + 2] = img.data[i + 2 + dx];
		img.data[i + 3] = img.data[i + 3 + dx];
	}
};

tx.warble = (img, param1, param2) => {
	for (let y = 0; y < img.height; y++) {
		let dx = (Math.sin(Math.PI * (y / param1)) + 1) / 2;
		dx = Math.floor(dx * param2) * 4;

		for (let x = 0; x < img.width; x++) {
			let i = (y * img.width + x) * 4;
			img.data[i + 0] = img.data[i + 0 + dx];
			img.data[i + 1] = img.data[i + 1 + dx];
			img.data[i + 2] = img.data[i + 2 + dx];
		}
	}
};

tx.mult = (img, r, g, b) => {
	for (let i = 0; i < img.data.length; i += 4) {
		img.data[i + 0] = img.data[i + 0] * r;
		img.data[i + 1] = img.data[i + 1] * g;
		img.data[i + 2] = img.data[i + 2] * b;
	}
};
