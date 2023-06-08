import Konva from "konva";
export default function CustomLine(points) {
	const line = new Konva.Line({
		points: [
			...points
		],
		stroke: 'black',
		strokeWidth: 2,
	});

	return line;
}