import { render, fireEvent, screen } from '@testing-library/react';
import Waypoints from './Waypoints';
import { downloadGPXFile } from '../../util/gpx';
import SortableList from '../SortableList/SortableList';

jest.mock('../../util/gpx', () => ({
  downloadGPXFile: jest.fn(),
}));

jest.mock('../SortableList/SortableList', () =>
  jest.fn(() => <div>SortableList Mock</div>),
);
jest.mock('../WaypointItem/WaypointItem', () =>
  jest.fn(() => <div>WaypointItem Mock</div>),
);

const mockPoints = [
  { name: 'Point 1', lat: 10, lon: 10, id: 'id1' },
  { name: 'Point 2', lat: 20, lon: 20, id: 'id2' },
];

describe('Waypoints', () => {
  const setPoints = jest.fn();
  const clearPoints = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders and shows the correct count', () => {
    render(
      <Waypoints points={mockPoints} setPoints={setPoints} clearPoints={clearPoints} />,
    );

    expect(screen.getByText('Route Builder')).toBeInTheDocument();
    expect(
      screen.getByText(`Clear waypoints (current: ${mockPoints.length})`),
    ).toBeInTheDocument();
  });

  test('renders SortableList with WaypointItem for each point', () => {
    const setPoints = jest.fn();
    const clearPoints = jest.fn();

    render(
      <Waypoints points={mockPoints} setPoints={setPoints} clearPoints={clearPoints} />,
    );

    expect(screen.getByText('SortableList Mock')).toBeInTheDocument();
    expect(SortableList).toHaveBeenCalledWith(
      expect.objectContaining({
        points: mockPoints,
        setPoints: expect.any(Function),
      }),
      {},
    );
  });

  test('calls clearPoints when the clear link is clicked', () => {
    render(
      <Waypoints points={mockPoints} setPoints={setPoints} clearPoints={clearPoints} />,
    );
    fireEvent.click(screen.getByText(/Clear waypoints/));

    expect(clearPoints).toHaveBeenCalledTimes(1);
  });

  test('calls downloadGPXFile when the download button is clicked', () => {
    render(
      <Waypoints points={mockPoints} setPoints={setPoints} clearPoints={clearPoints} />,
    );
    fireEvent.click(screen.getByText(/Download your Route/));

    expect(downloadGPXFile).toHaveBeenCalledWith(mockPoints);
  });
});
