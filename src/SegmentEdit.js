import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import CustomLine from './CustomLine.js';
import { EditPanelGrid, Panel } from './style.js';

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
			width: 600,
			height: 600,
		});
		const lineLayer = new Konva.Layer();
		const circleLayer = new Konva.Layer();
		stage.add(lineLayer);
		stage.add(circleLayer);

		massHullPoints.slice(0,massHullPoints.length).forEach((hullPoints,index)=>{
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

	function deleteNodehandler(event){
		const input = event.target.innerText;
		const nodes = stageRef.current?.find('.seg'+input);
		nodes.forEach(node=>node.destroy());
	}

	function mouseOutHandler(event){
		const input = event.target.innerText;
		const nodes = stageRef.current?.find('.seg'+input);
		nodes.forEach(node=>node.opacity(1));
	}

	function mouseOverHandler(event){
		const input = event.target.innerText;
		const nodes = stageRef.current?.find('.seg'+input);
		nodes.forEach(node=>node.opacity(0));
	}

	return (
		<div>
			<div ref={containerRef} />
			<button onClick={deleteHandler} ref={buttonRef}>Enable delete points</button>
			<EditPanelGrid>
				<h3>Do you want to delete any segments?</h3>
				{massHullPoints.map((hullPoints,index)=>{
					return <Panel onClick={deleteNodehandler} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler} key={index}>{index+1}</Panel>
				})}
			</EditPanelGrid>
		</div>
	);
};
