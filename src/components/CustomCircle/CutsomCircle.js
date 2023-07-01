import { useState } from 'react';
import { Circle } from 'react-konva';

export default function DrawCircle({
  points,
  group,
  StageRef,
  shouldDelete,
  setHullPointsState,
  setCirclePoints
}) {
  const [filteredData, setFilteredData] = useState({});

  const removePoints = (filteredLines, currentCircle) => {
	console.log(filteredLines)
    let startPoints = null;
    let endPoints = null;
    filteredLines.forEach((eachLine) => {
      const [x1, y1, ,] = eachLine.points();
	  console.log(x1,y1)
      if (x1 === currentCircle.x() && y1 === currentCircle.y()) {
        endPoints = eachLine.points().slice(2);
	} else {
		startPoints = eachLine.points().slice(0, 2);
	}	  
    });
	console.log(startPoints,endPoints);
	if(!startPoints){
		setCirclePoints((prevState)=> prevState.filter((eachCirclePoints,index)=>{
			if(index === currentCircle.attrs.group){
				return false;
			}
			return eachCirclePoints;
		}));
		return
	}
	
	setHullPointsState((prevState) => prevState.map((eachHullPoints, index) => {
		if (index === currentCircle.attrs.group) {
			let targetIndex = null; 
			prevState[index].forEach((points,pointIndex)=>{
				// console.log('p->',points)
				if(points[0]===startPoints[0] && points[1]===startPoints[1])
					targetIndex=pointIndex;
			})
			if(targetIndex===prevState[index].length-1){
				prevState[index].splice(targetIndex,1,[...startPoints,...endPoints]);
				const modState = prevState[index].slice(1);
				console.log(modState);
				return modState;
			}
			else{
				prevState[index].splice(targetIndex,2,[...startPoints,...endPoints]);
				return prevState[index]
			}
		}
		return eachHullPoints;
	}));

	setCirclePoints((prevState)=> prevState.filter((eachCirclePoints,index)=>{
		if(index === currentCircle.attrs.group){
			return [...startPoints,...endPoints];
		}
		return eachCirclePoints;
	}));
  };

  const findNearerPoints = (currentCircle) => {
    const allCircles = StageRef.current.find('Circle');
    const [x, y] = [currentCircle.x(), currentCircle.y()];
    allCircles.forEach((eachCircle) => {
      if (
        Math.abs(eachCircle.x() - x) <= 7 &&
        Math.abs(eachCircle.y() - y) <= 7 &&
        eachCircle.attrs.group !== currentCircle.attrs.group
      ) {
        currentCircle.x(eachCircle.x());
        currentCircle.y(eachCircle.y());
      }
    });
    return false;
  };

  const handleCircleClick = (event) => {
    const currentCircle = event.target;
    const allLines = StageRef.current.find('Line');
    const currentFilteredLines = allLines.filter((eachLine) => {
		const [x1, y1, x2, y2] = eachLine.points();
      if (
        eachLine.attrs.group === currentCircle.attrs.group &&
        ((x1 === currentCircle.x() && y1 === currentCircle.y()) ||
          (x2 === currentCircle.x() && y2 === currentCircle.y()))
      ) {
        return true;
      }
      return false;
    });
    const currentTrack = {};
    currentTrack.circle = [currentCircle.x(), currentCircle.y()];
    currentTrack.lines = currentFilteredLines;
    if (shouldDelete) {
      removePoints(currentFilteredLines, currentCircle);
    }
    setFilteredData((prevState) => ({ ...prevState, ...currentTrack }));
  };

  const handleCircleMove = (event) => {
    const currentCircle = event.target;
    findNearerPoints(currentCircle);
    filteredData.lines.forEach((eachLine) => {
      const [x1, y1, x2, y2] = eachLine.points();
      if (x1 === filteredData.circle[0] && y1 === filteredData.circle[1]) {
        eachLine.points([currentCircle.x(), currentCircle.y(), x2, y2]);
        filteredData.circle = [currentCircle.x(), currentCircle.y()];
      } else {
        eachLine.points([x1, y1, currentCircle.x(), currentCircle.y()]);
      }
    });
  };

  const handleMouseUp = () => {
    const newHullState = [];
    const lineGroup = StageRef.current.children[0].children;
    lineGroup.forEach((eachGroup, index) => {
      newHullState[index] = [];
      const allLinePoints = eachGroup.children;
      allLinePoints.forEach((eachLine) => {
        if (eachLine.className === 'Line') {
          newHullState[index].push(eachLine.points());
        }
      });
    });
    // setHullPointsState(newHullState);
  };

  return (
    <Circle
      x={points[0]}
      y={points[1]}
      radius={4}
      fill='red'
      draggable={shouldDelete?false:true}
      onMouseDown={handleCircleClick}
      onDragMove={handleCircleMove}
      onMouseUp={handleMouseUp}
      group={group}
    />
  );
}
