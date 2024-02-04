import React, { useState, useCallback } from 'react';
import { Waypoint } from '../../types';
import DragHandle from '../icons/DragHandle';
import Button from '../Button/Button';
import Trash from '../icons/Trash';
import './WaypointItem.scss';

interface WaypointItemProps {
  point: Waypoint;
  index: number;
  updatePoint: (index: number, name: string) => void;
  deletePoint: (index: number) => void;
}

const WaypointItem: React.FC<WaypointItemProps> = ({
  point,
  index,
  updatePoint,
  deletePoint,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalName, setOriginalName] = useState(point.name);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
    setOriginalName(point.name);
  }, [point.name]);

  const handleEditEnd = useCallback(
    (e: React.FocusEvent<HTMLSpanElement>) => {
      updatePoint(index, e.currentTarget.textContent || originalName);

      setIsEditing(false);
    },
    [index, originalName, updatePoint],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      switch (e.key) {
        case 'Escape':
          e.currentTarget.textContent = originalName;
          e.currentTarget.blur();

          setIsEditing(false);
          break;

        case 'Enter':
          e.currentTarget.blur();
          break;
      }
    },
    [originalName],
  );

  return (
    <>
      <DragHandle width={20} className="icon" />
      <span
        className={`name ${isEditing ? 'editing' : ''}`}
        onDoubleClick={handleDoubleClick}
        onBlur={handleEditEnd}
        onKeyDown={handleKeyDown}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
      >
        {point.name}
      </span>

      <Button onClick={() => deletePoint(index)}>
        <Trash width={10} className="icon" />
      </Button>
    </>
  );
};

export default WaypointItem;
