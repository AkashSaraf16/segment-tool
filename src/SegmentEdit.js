import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import CustomLine from './CustomLine.js';

// import hullPoints from './hull.js';
import hullPoints, { massHullPoints } from './hull.js'
import CustomCircle from './CustomCircle.js';

export default function SegmentEdit() {
	const containerRef = useRef(null);
	const stageRef = useRef(null);
	const buttonRef = useRef(null);
	let intersectingLines = [];
	let isDelete = false;

	useEffect(() => {
		const stage = new Konva.Stage({
			container: containerRef.current,
			width: window.innerWidth,
			height: window.innerHeight,
		});
		const lineLayer = new Konva.Layer();
		const circleLayer = new Konva.Layer();
		stage.add(lineLayer);
		stage.add(circleLayer);

		massHullPoints.slice(0,2).forEach((hullPoints,index)=>{
			for (let i = 0; i < hullPoints.length - 1; i++) {
				const line = CustomLine([hullPoints[i][0], hullPoints[i][1], hullPoints[i + 1][0], hullPoints[i + 1][1]],index);
				const circleStart = CustomCircle([hullPoints[i][0], hullPoints[i][1]], intersectingLines, lineLayer, circleLayer, buttonRef,index);
				line.startCircle = circleStart;
				lineLayer.add(line);
				circleLayer.add(circleStart);
			}
		})
		stageRef.current = stage;

		return () => {
			stage.destroy();
		};
	}, []);

	function deleteHandler(event) {
		const text = 'Enable delete points';
		event.target.innerText =
			event.target.innerText === text ? 'Disable delete points' : text;
		isDelete = !isDelete;
	}

	return (
		<div>
			<div ref={containerRef} />
			<button onClick={deleteHandler} ref={buttonRef}>Enable delete points</button>
		</div>
	);
};
