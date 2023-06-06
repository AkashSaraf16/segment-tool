import React, { useEffect, useRef } from 'react';
import Konva from 'konva';

import hullPoints from './hull.js';

export default function SegmentEdit() {
	const containerRef = useRef(null);
	const stageRef = useRef(null);
	const lineLayerRef = useRef(null);
	const circleLayerRef = useRef(null);

	const lines = [];
	let intersectingLines = [];

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

		for (let i = 0; i < hullPoints.length - 1; i++) {
			const line = new Konva.Line({
				points: [
					hullPoints[i][0],
					hullPoints[i][1],
					hullPoints[i + 1][0],
					hullPoints[i + 1][1],
				],
				stroke: 'black',
				strokeWidth: 2,
			});

			const circleStart = new Konva.Circle({
				x: hullPoints[i][0],
				y: hullPoints[i][1],
				radius: 4,
				fill: 'red',
				draggable: true,
			});

			line.startCircle = circleStart;

			circleStart.on('mousedown', handleCircleClick);

			circleStart.on('dragmove', handleCircleMove);

			lines.push(line);

			lineLayer.add(line);
			circleLayer.add(circleStart);
		}

		stageRef.current = stage;
		lineLayerRef.current = lineLayer;
		circleLayerRef.current = circleLayer;

		return () => {
			stage.destroy();
		};
	}, []);

	const handleCircleClick = (event) => {
		const filteredLines = lines.filter((eachLine) => {
			const currentCircle = event.target;
			const [x1, y1, x2, y2] = eachLine.points();
			if (
				(x1 === currentCircle.x() && y1 === currentCircle.y()) ||
				(x2 === currentCircle.x() && y2 === currentCircle.y())
			) {
				return true;
			}
			return false;
		});
		intersectingLines = filteredLines;
	};

	const handleCircleMove = (event) => {
		const currentCircle = event.target;
		intersectingLines.forEach((eachLine) => {
			if (eachLine.startCircle._id === currentCircle._id) {
				const [, , x2, y2] = eachLine.points();
				eachLine.points([currentCircle.x(), currentCircle.y(), x2, y2]);
			} else {
				eachLine.points([
					eachLine.startCircle.x(),
					eachLine.startCircle.y(),
					currentCircle.x(),
					currentCircle.y(),
				]);
			}
		});
		lineLayerRef.current.batchDraw();
	};

	return (
		<div>
			<div ref={containerRef} />
		</div>
	);
};
