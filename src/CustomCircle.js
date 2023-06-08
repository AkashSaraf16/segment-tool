import Konva from "konva";

export default function CustomCircle(points, intersectingLines, lineLayer, buttonRef) {

	function handleCircleClick(event) {
		const currentCircle = event.target;
		const filteredLines = lineLayer.children.filter((eachLine) => {
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
		if (buttonRef.current.innerText === 'Disable delete points') {
			removePoints(intersectingLines, currentCircle);
		}
	}

	function removePoints(intersectingLines, currentCircle) {
		let startPoints = null;
		let endPoints = null;
		let lineCircle = null;
		intersectingLines.forEach((eachLine) => {
			if (eachLine.startCircle._id === currentCircle._id) {
				endPoints = eachLine.points().slice(2);
				eachLine.remove();
			} else {
				startPoints = eachLine.points().slice(0, 2);
				lineCircle = eachLine.startCircle;
				eachLine.remove();
			}
		});
		const newLine = new Konva.Line({
			points: [...startPoints, ...endPoints],
			stroke: 'black',
			strokeWidth: 2,
		});
		newLine.startCircle = lineCircle;
		currentCircle.remove();
		lineLayer.add(newLine);
		lineLayer.batchDraw();
	}

	function handleCircleMove(event) {
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
		lineLayer.batchDraw();
	};

	const circleStart = new Konva.Circle({
		x: points[0],
		y: points[1],
		radius: 4,
		fill: 'red',
		draggable: true,
	});

	circleStart.on('mousedown', handleCircleClick);

	circleStart.on('dragmove', handleCircleMove);

	return circleStart;
}