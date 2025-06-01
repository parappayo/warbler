var gen = gen || {};

gen.black = [0.0, 0.0, 0.0, 1.0];
gen.white = [1.0, 1.0, 1.0, 1.0];
gen.red = [1.0, 0.0, 0.0, 1.0];

// should go in common image manipulation package
gen.setPixel = (img, x, y, colour) => {
	let i = (y * img.width + x) * 4;
	img.data[i + 0] = colour[0];
	img.data[i + 1] = colour[1];
	img.data[i + 2] = colour[2];
	img.data[i + 3] = colour[3];
};

gen.verticalStripes = (width, height, stripeWidth) => {
	let img = {width, height, data: []};
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			img.data.push(0, 0, 0, 0);
			if (Math.floor(x / stripeWidth) % 2 == 0) {
				gen.setPixel(img, x, y, gen.black);
			} else {
				gen.setPixel(img, x, y, gen.white);
			}
		}
	}
	return img;
};
