import Konva from 'konva';
import { useState } from 'react';
import { Circle } from 'react-konva';

export default function DrawCircle({
  points,
  group,
  lineRefs,
  lineLayer,
  circleLayer,
  intersectingLines,
}) {
  const [filteredLines, setFilteredLines] = useState({});
  function handleCircleClick(event) {
    const currentCircle = event.target;
    const allLines = lineRefs.current.find('Line');
    const currentFilteredLines = allLines.filter((eachLine) => {
      const [x1, y1, x2, y2] = eachLine.points();
      if (
        eachLine.group === currentCircle.group &&
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
    setFilteredLines((prevState) => ({ ...prevState, ...currentTrack }));
  }

  function removePoints(intersectingLines, currentCircle) {
    let startPoints = null;
    let endPoints = null;
    let lineCircle = null;
    if (intersectingLines.length <= 1) return;
    intersectingLines.forEach((eachLine) => {
      if (eachLine.startCircle._id === currentCircle._id) {
        endPoints = eachLine.points().slice(2);
        eachLine.remove();
      } else {
        startPoints = eachLine.points().slice(0, 2);
        lineCircle = eachLine.startCircle;
        eachLine.remove();
      }
    });
    const newLine = new Konva.Line({
      name: `seg${group + 1}`,
      points: [...startPoints, ...endPoints],
      stroke: 'black',
      strokeWidth: 2,
    });
    newLine.group = lineCircle.group;
    newLine.startCircle = lineCircle;
    currentCircle.remove();
    lineLayer.add(newLine);
    lineLayer.batchDraw();
  }

  function handleCircleMove(event) {
    const currentCircle = event.target;
    filteredLines.lines.forEach((eachLine) => {
      const [x1, y1, x2, y2] = eachLine.points();
      if (x1 === filteredLines.circle[0] && y1 === filteredLines.circle[1]) {
        eachLine.points([currentCircle.x(), currentCircle.y(), x2, y2]);
        filteredLines.circle = [currentCircle.x(), currentCircle.y()];
      } else {
        eachLine.points([x1, y1, currentCircle.x(), currentCircle.y()]);
      }
    });
    // findNearestPoint(currentCircle);
    // intersectingLines.forEach((eachLine) => {
    //   if (eachLine.startCircle._id === currentCircle._id) {
    //     const [, , x2, y2] = eachLine.points();
    //     eachLine.points([currentCircle.x(), currentCircle.y(), x2, y2]);
    //   } else {
    //     eachLine.points([
    //       eachLine.startCircle.x(),
    //       eachLine.startCircle.y(),
    //       currentCircle.x(),
    //       currentCircle.y(),
    //     ]);
    //   }
    // });
    // lineLayer.batchDraw();
  }

  function findNearestPoint(currentCircle) {
    const [x, y] = [currentCircle.x(), currentCircle.y()];
    circleLayer.children.map((eachCircle) => {
      if (
        eachCircle._id !== currentCircle._id &&
        eachCircle.group !== currentCircle.group &&
        Math.abs(eachCircle.x() - x) <= 7 &&
        Math.abs(eachCircle.y() - y) <= 7
      ) {
        currentCircle.x(eachCircle.x());
        currentCircle.y(eachCircle.y());
      }
    });
    return false;
  }

  const [start, end] = points;
  if (!end) return;

  return (
    <Circle
      x={start[0]}
      y={start[1]}
      radius={4}
      fill='red'
      draggable={true}
      onMouseDown={handleCircleClick}
      onDragMove={handleCircleMove}
      group={group}
    />
  );
}
