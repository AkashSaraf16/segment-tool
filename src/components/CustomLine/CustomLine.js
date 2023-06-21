import Konva from "konva";
export default function CustomLine(points,group) {
	const line = new Konva.Line({
		name:`seg${group+1}`,
		points: [
			...points
		],
		stroke: 'black',
		strokeWidth: 2,
	});
	line.group = group;
	return line;
}