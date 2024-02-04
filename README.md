# Route-Builder

- Hosted at https://bhashkarsharma.github.io/route-builder/

### Installation

- Install [nvm](https://github.com/nvm-sh/nvm)
- Run `nvm install` in the repo root directory
- Run `npm install`

### Running the App

- Run `npm start` to start the application
- Navigate to http://localhost:5173/

### Running Tests

- Run `npm test`

### Details

- The map view is an &lt;iframe&gt; that renders in the background.
- We overlay the waypoints and routes on top of the map.
- The Waypoints can be renamed by double-clicking on their name in the list.
- Dragging the waypoints updates the route.
- The route is displayed using SVG.
- The GPX file can be downloaded by clicking on the 'Download your Route' button.
- We use the browser native `crypto.randomUUID()` method for generating UUIDs for each Waypoint. This could be replaced with the `uuid` module from npm.
- The current implementation uses pixels as the corrdinate system. This can be enhanced to use actual lat/lon values for the points.
- The current state is stored in LocalStorage, and preserved across page reloads.

#### Possible Enhancements

- Dragging and dropping the GPX file on the UI loads and displays the route.

### Learnings

- Map rendering, routing, waypoints and other related mapping concepts.
- Building a sortable drag-and-drop list natively.
- Setting a `base` directory in vite config.
