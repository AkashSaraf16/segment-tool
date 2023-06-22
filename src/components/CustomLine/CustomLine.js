import { Line } from 'react-konva';
import DrawCircle from '../CustomCircle/CutsomCircle';
export default function DrawLine({
  points,
  group,
  StageRef,
  setHullPointsState,
  shouldDelete,
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
      <DrawCircle
        points={points.slice(0, 2)}
        group={group}
        StageRef={StageRef}
        shouldDelete={shouldDelete}
        setHullPointsState={setHullPointsState}
      />
    </>
  );
}
