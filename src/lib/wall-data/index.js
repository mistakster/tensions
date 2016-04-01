function generateWall(cells, x, y, width, height) {
	const wall = [];
	let i;

	// top
	for (i = 0; i < cells; i++) {
		wall.push({
			x: x + i * width / cells,
			y: y
		});
	}
	// right
	for (i = 0; i < cells; i++) {
		wall.push({
			x: x + width,
			y: y + i * height / cells
		});
	}
	// bottom
	for (i = 0; i < cells; i++) {
		wall.push({
			x: x + width - i * width / cells,
			y: y + height
		});
	}
	// left
	for (i = 0; i < cells; i++) {
		wall.push({
			x: x,
			y: y + height - i * height / cells
		});
	}

	return wall;
}

export default generateWall;
