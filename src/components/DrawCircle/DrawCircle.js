import Konva from "konva";

export default function DrawCircle(points, intersectingLines, lineLayer, circleLayer, buttonRef,group) {

	function handleCircleClick(event) {
		const currentCircle = event.target;
		const filteredLines = lineLayer.children.filter((eachLine) => {
			const [x1, y1, x2, y2] = eachLine.points();
			if (
				(eachLine.group === currentCircle.group) &&
				((x1 === currentCircle.x() && y1 === currentCircle.y()) ||
				(x2 === currentCircle.x() && y2 === currentCircle.y()))
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
		if(intersectingLines.length<=1)
			return;
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
			name:`seg${group+1}`,
			points: [...startPoints, ...endPoints],
			stroke: 'black',
			strokeWidth: 2,
		});
		newLine.group = lineCircle.group;
		newLine.startCircle = lineCircle;
		currentCircle.remove();
		lineLayer.add(newLine);
		lineLayer.batchDraw();
	}

	function handleCircleMove(event) {
		const currentCircle = event.target;
		findNearestPoint(currentCircle);
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

	function findNearestPoint(currentCircle) {
		const [x, y] = [currentCircle.x(), currentCircle.y()];
		circleLayer.children.map((eachCircle) => {
		  if (
			eachCircle._id !== currentCircle._id &&
			eachCircle.group !== currentCircle.group &&
			Math.abs(eachCircle.x() - x) <= 7 &&
			Math.abs(eachCircle.y() - y) <= 7
		  ) {
			currentCircle.x(eachCircle.x());
			currentCircle.y(eachCircle.y());
		  }
		});
		return false;
	  }

	const circleStart = new Konva.Circle({
		name:`seg${group+1}`,
		x: points[0],
		y: points[1],
		radius: 4,
		fill: 'red',
		draggable: true,
	});
	circleStart.group = group;

	circleStart.on('mousedown', handleCircleClick);

	circleStart.on('dragmove', handleCircleMove);

	return circleStart;
}