import { Waypoint } from '../types';

const DOWNLOAD_FILENAME = 'route.gpx';

export function buildGPXFile(
  waypoints: Waypoint[],
  routeName = 'Your Route',
  routeDescription = 'A description of your route',
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <gpx version="1.1" creator="RouteBuilder" xmlns="http://www.topografix.com/GPX/1/1">
        <metadata>
          <name>${routeName}</name>
          <desc>${routeDescription}</desc>
        </metadata>
        ${waypoints
          .map(
            (point) => `
        <wpt lat="${point.lat}" lon="${point.lon}">
          <name>${point.name}</name>
        </wpt>`,
          )
          .join('\n')}
        <rte>
            <name>${routeName}</name>
            ${waypoints
              .map(
                (point) => `
            <rtept lat="${point.lat}" lon="${point.lon}">
              <name>${point.name}</name>
            </rtept>`,
              )
              .join('\n')}
        </rte>
    </gpx>`;
}

export function downloadGPXFile(points: Waypoint[]) {
  const gpxContent = buildGPXFile(points);
  const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = DOWNLOAD_FILENAME;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
