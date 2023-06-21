import { Line } from 'react-konva';
export default function DrawLine({ points, group }) {
  const [start, end] = points;
  if (!end) return;
  return (
    <Line
      points={[...start, ...end]}
      group={group}
      stroke={'black'}
      strokeWidth={2}
      startCircle={'hello'}
    />
  );
}
