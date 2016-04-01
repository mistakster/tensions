import styles from './main-canvas.css';

import d3 from 'd3';

const WIDTH = 960;
const HEIGHT = 500;

const mainCanvas = d3.select('#app')
	.append('svg:svg')
	.attr('width', WIDTH)
	.attr('height', HEIGHT)
	.attr('class', styles.root);

export default mainCanvas;
