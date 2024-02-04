import { buildGPXFile, downloadGPXFile } from './gpx';

describe('GPX Module', () => {
  const waypoints = [
    { name: 'Waypoint 1', lat: 34.052235, lon: -118.243683, id: 'wp1' },
    { name: 'Waypoint 2', lat: 40.712776, lon: -74.005974, id: 'wp2' },
  ];

  describe('buildGPXFile', () => {
    it('should build a GPX file string with default route name and description', () => {
      const result = buildGPXFile(waypoints);
      expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(result).toContain('<name>Your Route</name>');
      expect(result).toContain('<desc>A description of your route</desc>');
      waypoints.forEach((wp) => {
        expect(result).toContain(`<name>${wp.name}</name>`);
        expect(result).toContain(`lat="${wp.lat}"`);
        expect(result).toContain(`lon="${wp.lon}"`);
      });
    });

    it('should allow customization of route name and description', () => {
      const routeName = 'Custom Route';
      const routeDescription = 'Custom Description';
      const result = buildGPXFile(waypoints, routeName, routeDescription);
      expect(result).toContain(`<name>${routeName}</name>`);
      expect(result).toContain(`<desc>${routeDescription}</desc>`);
    });
  });

  describe('downloadGPXFile', () => {
    beforeAll(() => {
      // Mock the Blob constructor
      global.Blob = jest.fn().mockImplementation((content, options) => {
        return { content, options };
      });

      // Mock the URL.createObjectURL function
      global.URL.createObjectURL = jest.fn().mockReturnValue('blob:http://fake-url');
      global.URL.revokeObjectURL = jest.fn();

      // Mock the click method on the anchor element
      HTMLAnchorElement.prototype.click = jest.fn();
    });

    afterAll(() => {
      // Restore the mocks
      (global.Blob as jest.Mock).mockRestore();
      (global.URL.createObjectURL as jest.Mock).mockRestore();
      (global.URL.revokeObjectURL as jest.Mock).mockRestore();
      (HTMLAnchorElement.prototype.click as jest.Mock).mockRestore();
    });

    it('should create and trigger a download for a GPX file', () => {
      document.body.appendChild = jest.fn();
      document.body.removeChild = jest.fn();

      downloadGPXFile(waypoints);

      expect(Blob).toHaveBeenCalledWith(
        [expect.stringContaining('<gpx version="1.1" creator="RouteBuilder"')],
        { type: 'application/gpx+xml' },
      );
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(document.body.appendChild).toHaveBeenCalled();
      expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
      expect(document.body.removeChild).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://fake-url');
    });
  });
});
