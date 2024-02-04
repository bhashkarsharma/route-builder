import { render, fireEvent } from '@testing-library/react';
import WaypointItem from './WaypointItem';

const mockPoint = { id: '1', name: 'Waypoint 1', lat: 10, lon: 20 };

describe('WaypointItem', () => {
  test('enters edit mode on double click', () => {
    const updatePoint = jest.fn();
    const deletePoint = jest.fn();
    const { getByText } = render(
      <WaypointItem
        point={mockPoint}
        index={0}
        updatePoint={updatePoint}
        deletePoint={deletePoint}
      />,
    );

    const nameSpan = getByText(mockPoint.name);
    fireEvent.doubleClick(nameSpan);

    expect(nameSpan).toHaveAttribute('contentEditable', 'true');
  });

  test('updates point on blur', () => {
    const updatePoint = jest.fn();
    const deletePoint = jest.fn();
    const { getByText } = render(
      <WaypointItem
        point={mockPoint}
        index={0}
        updatePoint={updatePoint}
        deletePoint={deletePoint}
      />,
    );

    const nameSpan = getByText(mockPoint.name);
    fireEvent.doubleClick(nameSpan);

    nameSpan.textContent = 'New Name';
    fireEvent.blur(nameSpan);

    expect(updatePoint).toHaveBeenCalledWith(0, 'New Name');
  });

  test('reverts to original name on Escape key', () => {
    const updatePoint = jest.fn();
    const deletePoint = jest.fn();
    const { getByText } = render(
      <WaypointItem
        point={mockPoint}
        index={0}
        updatePoint={updatePoint}
        deletePoint={deletePoint}
      />,
    );

    const nameSpan = getByText(mockPoint.name);
    fireEvent.doubleClick(nameSpan);

    nameSpan.textContent = 'New Name';
    fireEvent.keyDown(nameSpan, { key: 'Escape' });

    expect(nameSpan).toHaveAttribute('contentEditable', 'false');
    expect(nameSpan.textContent).toBe(mockPoint.name);
  });

  test('calls deletePoint on delete button click', () => {
    const updatePoint = jest.fn();
    const deletePoint = jest.fn();
    const { getByRole } = render(
      <WaypointItem
        point={mockPoint}
        index={0}
        updatePoint={updatePoint}
        deletePoint={deletePoint}
      />,
    );

    const deleteButton = getByRole('button');
    fireEvent.click(deleteButton);

    expect(deletePoint).toHaveBeenCalledWith(0);
  });
});
