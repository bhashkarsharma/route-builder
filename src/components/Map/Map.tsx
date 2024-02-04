import { Waypoint, createWaypoint } from '../../types';
import './Map.scss';

interface MapProps {
  points: Waypoint[];
  setPoints: (items: Waypoint[]) => void;
}

export default function Map({ points, setPoints }: MapProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    setPoints([...points, createWaypoint(x, y)]);
  };

  const ignoreClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="map-container">
      <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=9.441375732421877%2C53.36407490685412%2C10.148620605468752%2C53.736528053783026&amp;layer=mapnik"></iframe>
      <div className="map-overlay" onClick={handleOverlayClick} data-testid="map-overlay">
        <svg className="route-lines">
          {points.map(
            (point, index) =>
              index > 0 && (
                <line
                  className="line"
                  key={index}
                  x1={points[index - 1].lat}
                  y1={points[index - 1].lon}
                  x2={point.lat}
                  y2={point.lon}
                />
              ),
          )}
        </svg>
        {points.map((point, index) => (
          <div
            key={index}
            className="waypoint"
            style={{ top: point.lon, left: point.lat }}
            onClick={ignoreClick}
            data-name={point.name}
            data-testid={`waypoint-${point.id}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
