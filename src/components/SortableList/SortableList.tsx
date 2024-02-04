import React, { useState, useCallback } from 'react';
import { Waypoint } from '../../types';
import './SortableList.scss';
import cx from 'classnames';

interface SortableListProps {
  points: Waypoint[];
  setPoints: (items: Waypoint[]) => void;
  className?: string;
  renderItem: (item: Waypoint, index: number) => React.ReactNode;
}

const SortableList: React.FC<SortableListProps> = ({
  points,
  setPoints,
  className,
  renderItem,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLLIElement>, targetIndex: number) => {
      if (draggedIndex === null || draggedIndex === targetIndex) return;

      const newPoints = [...points];
      const [reorderedItem] = newPoints.splice(draggedIndex, 1);
      newPoints.splice(targetIndex, 0, reorderedItem);

      setPoints(newPoints);
      setDraggedIndex(targetIndex);

      event.preventDefault();
    },
    [draggedIndex, points, setPoints],
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  return (
    <ul className={`${className} sortable-list`}>
      {points.map((point, index) => (
        <li
          key={point.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragEnd={handleDragEnd}
          className={cx({
            dragged: draggedIndex === index,
            dragging: draggedIndex !== null && draggedIndex !== index,
          })}
        >
          {renderItem(point, index)}
        </li>
      ))}
    </ul>
  );
};

export default SortableList;
