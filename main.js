"use strict";

// image dimensions
const width = 1500;
const height = 1500;
const scaleFactor = 5;

let stripeWidth = 120;
let imgSrc;
let sourceImage;

let transforms = [
	//(img) => tx.mult(img, 0.1, 1.2, 1.0),
	(img) => tx.warble(img, 200, 600),
	//tx.invert,
	//(img) => tx.warble(img, 50, 500),
];

// ImageData.data is of type Uint8ClampedArray so any float32 values
// written to it are rounded down.
// Use this method to convert to an array of float32.
const imageDataToFloatRGB = (imageData) => {
	let result = {
		width: imageData.width,
		height: imageData.height,
		data: [],
	};
	for (let i = 0; i < imageData.data.length; i++) {
		// imageData.data[i] is uint8, result.data[i] is float32
		result.data.push(imageData.data[i] / 255);
	}
	return result;
};

const copyFloatRGBToImageData = (source, target) => {
	for (let i = 0; i < source.data.length; i++) {
		target.data[i] = source.data[i] * 255;
	}
};

const loadAsImageData = (url, canvas, callback) => {
	const ctx = canvas.getContext("2d");
	const image = new Image();
	image.addEventListener("load", () => {
		canvas.width = image.width;
		canvas.height = image.height;
		ctx.drawImage(image, 0, 0, image.width, image.height);
		const imageData = ctx.getImageData(0, 0, image.width, image.height);
		callback(imageData);
	});
	image.src = url;
};

const onClickLoad = () => {
	imgSrc = document.getElementById("imgSrc1").value;
	if (imgSrc.length > 1) {
		const canvas = document.getElementById("canvas1");
		loadAsImageData(imgSrc, canvas, (data) => {
			sourceImage = data;
			redrawCanvas();
		});
	}
};

const onChangeWarble = () => {
	const warble1 = document.getElementById("warble1").value;
	const warble2 = document.getElementById("warble2").value;
	transforms = [(img) => tx.warble(img, warble1, warble2)];
	redrawCanvas();
};

const onChangeStripeWidth = () => {
	stripeWidth = document.getElementById("stripe_width").value;
	redrawCanvas();
};

const redrawCanvas = () => {
	const canvas = document.getElementById("canvas1");

	let img, imageData;
	if (imgSrc && imgSrc.length > 1) {
		imageData = new ImageData(sourceImage.width, sourceImage.height);
		imageData.data.set(sourceImage.data);
		img = imageDataToFloatRGB(imageData);
	} else {
		imageData = new ImageData(width, height);
		img = gen.verticalStripes(width, height, stripeWidth);
	}
	transforms.forEach((tx) => tx(img));
	copyFloatRGBToImageData(img, imageData);

	const ctx = canvas.getContext("2d");
	ctx.scale(scaleFactor, scaleFactor)
	ctx.putImageData(imageData, 0, 0);
}

const onBodyLoad = () => {
	document.requestStorageAccess().then(() => {
			const canvas = document.getElementById("canvas1");
			canvas.width = width;
			canvas.height = height;
			canvas.style.width = "500px";
			canvas.style.height = "500px";

			document.getElementById("warble1").addEventListener("input", onChangeWarble);
			document.getElementById("warble2").addEventListener("input", onChangeWarble);
			document.getElementById("stripe_width").addEventListener("input", onChangeStripeWidth);

			redrawCanvas();
	});
};
