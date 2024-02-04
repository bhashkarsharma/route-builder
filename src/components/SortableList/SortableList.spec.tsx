import { render, fireEvent, screen } from '@testing-library/react';
import SortableList from './SortableList';
import { Waypoint } from '../../types';

const mockPoints = [
  { id: '1', name: 'Point 1', lat: 10, lon: 20 },
  { id: '2', name: 'Point 2', lat: 30, lon: 40 },
  { id: '3', name: 'Point 3', lat: 50, lon: 60 },
];

const renderItem = (item: Waypoint) => <div>{item.name}</div>;

describe('SortableList', () => {
  let setPoints: jest.Func;

  beforeEach(() => {
    setPoints = jest.fn();
  });

  test('renders correctly', () => {
    render(
      <SortableList points={mockPoints} setPoints={() => {}} renderItem={renderItem} />,
    );

    mockPoints.forEach((point) => {
      expect(screen.getByText(point.name)).toBeInTheDocument();
    });
  });

  test('sets draggedIndex on drag start', () => {
    const { getAllByRole } = render(
      <SortableList points={mockPoints} setPoints={setPoints} renderItem={renderItem} />,
    );

    const firstItem = getAllByRole('listitem')[0];
    fireEvent.dragStart(firstItem);

    const secondItem = getAllByRole('listitem')[1];
    fireEvent.dragEnter(secondItem);

    expect(setPoints).toHaveBeenCalledWith([
      expect.objectContaining({ id: '2' }),
      expect.objectContaining({ id: '1' }),
      expect.objectContaining({ id: '3' }),
    ]);
  });

  test('reorders points on drag enter', () => {
    const { getAllByRole } = render(
      <SortableList points={mockPoints} setPoints={setPoints} renderItem={renderItem} />,
    );

    const firstItem = getAllByRole('listitem')[0];
    const thirdItem = getAllByRole('listitem')[2];

    fireEvent.dragStart(firstItem);
    fireEvent.dragEnter(thirdItem);
    fireEvent.dragEnd(firstItem);

    expect(setPoints).toHaveBeenCalledWith([
      expect.objectContaining({ id: '2' }),
      expect.objectContaining({ id: '3' }),
      expect.objectContaining({ id: '1' }),
    ]);
  });

  test('clears draggedIndex on drag end', () => {
    const { getAllByRole } = render(
      <SortableList points={mockPoints} setPoints={setPoints} renderItem={renderItem} />,
    );

    const firstItem = getAllByRole('listitem')[0];
    fireEvent.dragStart(firstItem);
    fireEvent.dragEnd(firstItem);

    const secondItem = getAllByRole('listitem')[1];
    fireEvent.dragEnter(secondItem);

    expect(setPoints).not.toHaveBeenCalled();
  });
});
