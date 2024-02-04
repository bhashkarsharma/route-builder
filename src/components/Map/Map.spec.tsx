import { render, fireEvent, screen } from '@testing-library/react';
import Map from './Map';

jest.mock('../../types', () => ({
  createWaypoint: (x: number, y: number) => ({
    id: `id-${x}-${y}`,
    name: `Name ${x}-${y}`,
    lat: x,
    lon: y,
  }),
}));

describe('Map', () => {
  const initialPoints = [
    { id: '1', name: 'Point 1', lat: 10, lon: 20 },
    { id: '2', name: 'Point 2', lat: 30, lon: 40 },
  ];

  test('adds a new waypoint on map overlay click', () => {
    const setPoints = jest.fn();
    render(<Map points={initialPoints} setPoints={setPoints} />);

    fireEvent.click(screen.getByTestId('map-overlay'), { clientX: 50, clientY: 60 });

    expect(setPoints).toHaveBeenCalledTimes(1);
    expect(setPoints).toHaveBeenCalledWith([
      ...initialPoints,
      expect.objectContaining({ lat: 50, lon: 60 }),
    ]);
  });

  test('does not add a new waypoint on waypoint click', () => {
    const setPoints = jest.fn();
    render(<Map points={initialPoints} setPoints={setPoints} />);

    fireEvent.click(screen.getByTestId(`waypoint-${initialPoints[0].id}`));

    expect(setPoints).not.toHaveBeenCalled();
  });
});
