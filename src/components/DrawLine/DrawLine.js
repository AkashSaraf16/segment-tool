import Konva from 'konva';
import { Line } from 'react-konva';
export default function DrawLine({ points, group }) {
  const [start, end] = points;
  console.log(group);
  if(!end) return
  return <Line points={[...start, ...end]} group={group} stroke='black' strokeWidth2 />;
  //   const line = new Konva.Line({
  //     name: `seg${group + 1}`,
  //     points: [...points],
  //     stroke: 'black',
  //     strokeWidth: 2,
  //   });
  //   line.group = group;
  //   return line;
}
