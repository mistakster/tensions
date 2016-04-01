import d3 from 'd3';
import mainCanvas from './lib/main-canvas';
import generateWall from './lib/wall-data/index.js';

(function (data) {

	const baseIndex = data.length - 1;

	function getRandomPosition() {
		return 250 + 100 * Math.random() - 50;
	}

	data.push({
		x: getRandomPosition(),
		y: getRandomPosition(),
		r: 20 + Math.random() * 50
	}, {
		x: getRandomPosition(),
		y: getRandomPosition(),
		r: 20 + Math.random() * 50
	}, {
		x: getRandomPosition(),
		y: getRandomPosition(),
		r: 20 + Math.random() * 50
	});

	data.push({
		x: 120,
		y: 120,
		r: 1,
		attractor: true,
		fixed: true
	}, {
		x: 380,
		y: 120,
		r: 1,
		attractor: true,
		fixed: true
	}, {
		x: 380,
		y: 380,
		r: 1,
		attractor: true,
		fixed: true
	}, {
		x: 120,
		y: 380,
		r: 1,
		attractor: true,
		fixed: true
	});

	const links = [
		{
			source: baseIndex + 1,
			target: baseIndex + 2
		},
		{
			source: baseIndex + 2,
			target: baseIndex + 3
		//},
		//{
		//	source: baseIndex + 3,
		//	target: baseIndex + 1
		}
	];

	const nodes = mainCanvas.append('svg:g')
		.selectAll('circle')
		.data(data)
		.enter()
		.append('circle');

	var force = d3.layout.force()
		.nodes(data)
		.links(links)
		.linkDistance(250)
		.linkStrength(0.8)
		.size([500, 500])
		.friction(0.9)
		.charge(d => d.attractor ? 100 : (d.fixed ? -10 : -4 * d.r))
		.gravity(0.05)
		.theta(100)
		.alpha(0.1)
		.start();

	force.on('tick', () => {
		nodes
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
			.attr('r', d => d.r);
	});

}(
	generateWall(40, 50, 50, 400, 400)
		.map((cell, index) => {
			return {
				index: index,
				x: cell.x,
				y: cell.y,
				r: 2,
				fixed: true
			};
		})
));
