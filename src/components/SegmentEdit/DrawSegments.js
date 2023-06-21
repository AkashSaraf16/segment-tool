import React, { useEffect, useRef } from 'react';
import { massHullPoints } from '../../hull.js';
import { Stage, Layer, Group, Line, Circle } from 'react-konva';
import DrawLine from '../DrawLine/DrawLine';
import DrawCircle from '../DrawCircle/DrawCircle.js';

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
        {massHullPoints.map((eachHullPoints, eachHullIndex) => (
          <Group key={eachHullIndex}>
            {eachHullPoints.map((eachGroupPoints, eachIndex, eachGroupArr) => (
              <DrawCircle
                key={eachIndex}
                points={[eachGroupPoints, eachGroupArr[eachIndex + 1]]}
                group={eachHullIndex}
              />
            ))}
          </Group>
        ))}
      </Layer>
    </Stage>
  );
}

export default DrawSegments;
