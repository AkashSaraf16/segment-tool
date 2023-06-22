import { EditPanelGrid, Panel } from './style.js';

export const EditPanel = ({massHullPoints,stageRef}) => {
	function deleteNodehandler(event){
		const input = event.target.innerText;
		const nodes = stageRef.current?.find('.seg'+input);
		nodes.forEach(node=>node.destroy());
	}
	function mouseOverHandler(event){
		const input = event.target.innerText;
		const nodes = stageRef.current?.find('.seg'+input);
		nodes.forEach(node=>node.opacity(0));
	}
	function mouseOutHandler(event){
		const input = event.target.innerText;
		const nodes = stageRef.current?.find('.seg'+input);
		nodes.forEach(node=>node.opacity(1));
	}
	function showLinesPoints(events){
		const lines = stageRef.current?.find('Line');
		let linesPoints=[];
		for(const line of lines)
			linesPoints.push(line.attrs.points);
		console.log(linesPoints);
	}
	return (
		<>
			<EditPanelGrid>
				<h3>Do you want to delete any segments?</h3>
				{massHullPoints.map((hullPoints, index) => {
					return <Panel onClick={deleteNodehandler} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler} key={index}>{index + 1}</Panel>
				})}
			</EditPanelGrid>
			<div>
				<button onClick={showLinesPoints}>Save</button>
			</div>
		</>
	)
}

