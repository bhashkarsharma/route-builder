import { useCallback } from 'react';
import { Waypoint } from '../../types';
import { downloadGPXFile } from '../../util/gpx';
import Button from '../Button/Button';
import SortableList from '../SortableList/SortableList';
import './Waypoints.scss';
import WaypointItem from '../WaypointItem/WaypointItem';

interface WaypointsProps {
  points: Waypoint[];
  setPoints: (items: Waypoint[]) => void;
  clearPoints: () => void;
}

export default function Waypoints({ points, setPoints, clearPoints }: WaypointsProps) {
  const updatePoint = useCallback(
    (index: number, newName: string) => {
      const updatedPoints = [...points];
      updatedPoints[index] = { ...updatedPoints[index], name: newName };
      setPoints(updatedPoints);
    },
    [points, setPoints],
  );

  const deletePoint = useCallback(
    (index: number) => {
      setPoints(points.filter((_item, idx) => idx !== index));
    },
    [points, setPoints],
  );

  return (
    <aside className="sidebar">
      <h1 className="header">Route Builder</h1>

      <div className="waypoints-container">
        <SortableList
          points={points}
          setPoints={setPoints}
          className="waypoints"
          renderItem={(point, index) => {
            return (
              <WaypointItem
                key={point.id}
                point={point}
                index={index}
                updatePoint={updatePoint}
                deletePoint={deletePoint}
              />
            );
          }}
        />
      </div>

      <a className="clear-link" onClick={clearPoints}>
        Clear waypoints (current: {points.length})
      </a>

      <Button className="download-button" onClick={() => downloadGPXFile(points)}>
        Download your Route
      </Button>
    </aside>
  );
}
