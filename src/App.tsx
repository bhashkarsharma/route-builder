import { useEffect, useState } from 'react';

import './App.scss';
import Waypoints from './components/Waypoints/Waypoints';
import Map from './components/Map/Map';
import { Waypoint, createWaypoint } from './types';
import { readFromLocalStorage, writeToLocalStorage } from './util/localstorage';

const initialWaypoints = [
  createWaypoint(100, 100, 'Waypoint 1'),
  createWaypoint(200, 300, 'Waypoint 2'),
  createWaypoint(200, 200, 'Waypoint 3'),
];

const WAYPOINTS_LOCALSTORAGE_KEY = 'stored-waypoints';

function App() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>(
    readFromLocalStorage(WAYPOINTS_LOCALSTORAGE_KEY) || initialWaypoints,
  );

  useEffect(() => {
    writeToLocalStorage(WAYPOINTS_LOCALSTORAGE_KEY, waypoints);
  }, [waypoints]);

  const clearWaypoints = () => {
    writeToLocalStorage(WAYPOINTS_LOCALSTORAGE_KEY, []);

    window.location.reload();
  };

  return (
    <div className="container">
      <Waypoints
        points={waypoints}
        setPoints={setWaypoints}
        clearPoints={clearWaypoints}
      />
      <Map points={waypoints} setPoints={setWaypoints} />
    </div>
  );
}

export default App;
