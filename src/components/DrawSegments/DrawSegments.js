import React, { useEffect, useRef, useState } from 'react';
import { massHullPoints } from '../../hull.js';
import { Stage, Layer, Group} from 'react-konva';
import DrawLine from '../CustomLine/CustomLine.js';
import { EditPanel } from '../EditPanel/EditPanel.js';

function DrawSegments() {
  const StageRef = useRef(null);
  const lineLayerRef = useRef(null);
  const circleLayerRef = useRef(null);
  const [hullPointsState, setHullPointsState] = useState(massHullPoints);
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
		console.log(newHullState);
		setShouldDelete((prevState) => !prevState);
  }
  useEffect(() => {
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
                  StageRef={StageRef}
                  setHullPointsState={setHullPointsState}
                  shouldDelete={shouldDelete}
                />
              ))}
            </Group>
          ))}
        </Layer>
        {/* <Layer ref={circleLayerRef} name='circle'>
          {massHullPoints.map((eachHullPoints, eachHullIndex) => (
            <Group key={eachHullIndex}>
              {eachHullPoints.map(
                (eachGroupPoints, eachIndex, eachGroupArr) => (
                  <DrawCircle
                    key={eachIndex}
                    points={[eachGroupPoints, eachGroupArr[eachIndex + 1]]}
                    group={eachHullIndex}
                    StageRef={StageRef}
                    circleIndex={`${eachIndex}${eachHullIndex}`}
                    shouldDelete={shouldDelete}
                  />
                )
              )}
            </Group>
          ))}
        </Layer> */}
      </Stage>
      <input
        type='button'
        value={`${shouldDelete ? 'disable' : 'enable'} delete points`}
        onClick={deleteHandler}
      />
	  <EditPanel massHullPoints={hullPointsState} stageRef={StageRef}/>
    </>
  );
}

export default DrawSegments;
