export interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export function createWaypoint(lat: number, lon: number, name?: string): Waypoint {
  const id = crypto.randomUUID(); // can also use `uuid` module from npm

  return {
    id,
    lat,
    lon,
    name: name || `Waypoint ${id.slice(0, 3)}`,
  };
}
