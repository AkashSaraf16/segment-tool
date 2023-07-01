import { Line } from 'react-konva';
import DrawCircle from '../CustomCircle/CutsomCircle';
export default function DrawLine({
  points,
  group,
}) {
  return (
    <>
      <Line
        points={points}
        group={group}
        stroke={'black'}
        strokeWidth={2}
        startCircle={'hello'}
      />
    </>
  );
}
