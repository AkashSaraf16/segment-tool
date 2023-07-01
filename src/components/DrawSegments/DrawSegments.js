import React, { useEffect, useRef, useState } from 'react';
import { massHullPoints } from '../../hull.js';
import { Stage, Layer, Group} from 'react-konva';
import DrawLine from '../CustomLine/CustomLine.js';
import { EditPanel } from '../EditPanel/EditPanel.js';
import DrawCircle from '../CustomCircle/CutsomCircle.js';

function DrawSegments() {
  const StageRef = useRef(null);
  const lineLayerRef = useRef(null);
  const circleLayerRef = useRef(null);
  const [hullPointsState, setHullPointsState] = useState(massHullPoints);
  const [circlePointState, setCirclePointState] = useState([]);
  const [shouldDelete, setShouldDelete] = useState(false);

  function deleteHandler(){
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
		setHullPointsState(newHullState)
		setShouldDelete((prevState) => !prevState);
  }
  function extractCirclePoints(hullPointsState){
	const extractedPoints = [];
	hullPointsState.forEach((hullGroup,hullGroupIndex)=>{
		extractedPoints[hullGroupIndex] = [];
		hullGroup.forEach((points,index)=>{
			extractedPoints[hullGroupIndex].push([...points.slice(0,2)]);
		})
	})
	setCirclePointState(extractedPoints)
  }
  useEffect(() => {
	extractCirclePoints(hullPointsState);
    console.log(circlePointState);
	console.log(hullPointsState);
  }, [hullPointsState]);
  return (
    <>
      <Stage
        ref={StageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer ref={lineLayerRef} name='line'>
          {hullPointsState.map((eachHullPoints, eachHullIndex) => (
            <Group key={eachHullIndex} name={`seg${eachHullIndex+1}`}>
              {eachHullPoints.map((eachGroupPoints, eachIndex) => (
                <DrawLine
                  key={eachIndex}
                  points={eachGroupPoints}
                  group={eachHullIndex}
                />
              ))}
            </Group>
          ))}
        </Layer>
        <Layer ref={circleLayerRef} name='circle'>
          {circlePointState.map((groupPoints, groupIndex) => (
            <Group key={groupIndex} name={`seg${groupIndex+1}`}>
              {groupPoints.map(
                (points, index) => (
                  <DrawCircle
                    key={index}
                    points={[...points]}
                    group={groupIndex}
                    StageRef={StageRef}
                    shouldDelete={shouldDelete}
					setHullPointsState={setHullPointsState}
					setCirclePoints={setCirclePointState}
                  />
                )
              )}
            </Group>
          ))}
        </Layer>
      </Stage>
      <input
        type='button'
        value={`${shouldDelete ? 'Disable' : 'Enable'} delete points`}
        onClick={deleteHandler}
      />
	  <EditPanel massHullPoints={hullPointsState} stageRef={StageRef}/>
    </>
  );
}

export default DrawSegments;
