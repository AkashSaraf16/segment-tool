import React, { useEffect, useRef } from 'react';
import { massHullPoints } from '../../hull.js';
import { Stage, Layer, Group, Line, Circle } from 'react-konva';
import DrawLine from '../DrawLine/DrawLine';

function DrawSegments() {
  const lineLayerRef = useRef(null);
  const circleLayerRef = useRef(null);

  useEffect(() => {
    console.log(lineLayerRef.current);
  }, []);
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer ref={lineLayerRef} name='line'>
        {massHullPoints.map((eachHullPoints, eachHullIndex) => (
          <Group key={eachHullIndex}>
            {eachHullPoints.map((eachGroupPoints, eachIndex, eachGroupArr) => (
              <DrawLine
                key={eachIndex}
                points={[eachGroupPoints, eachGroupArr[eachIndex + 1]]}
                group={eachHullIndex}
              />
            ))}
          </Group>
        ))}
      </Layer>
      <Layer ref={circleLayerRef} name='circle'>
        {/* <Circle x={200} y={200} radius={50} fill='blue' /> */}
      </Layer>
    </Stage>
  );
}

export default DrawSegments;
