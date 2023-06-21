import React, { useEffect, useRef, useState } from 'react';
import { massHullPoints } from '../../hull.js';
import { Stage, Layer, Group, Line, Circle } from 'react-konva';
import DrawLine from '../DrawLine/CustomLine.js';
import DrawCircle from '../DrawCircle/DrawCircle.js';

function DrawSegments() {
  const StageRef = useRef(null);
  const lineLayerRef = useRef(null);
  const circleLayerRef = useRef(null);
  const [hullPointsState, setHullPointsState] = useState(massHullPoints);
  const [shouldDelete, setShouldDelete] = useState(false);

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
            <Group key={eachHullIndex}>
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
        onClick={(event) => {
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
          // setHullPointsState(newHullState);
          setShouldDelete((prevState) => !prevState);
        }}
      />
    </>
  );
}

export default DrawSegments;
