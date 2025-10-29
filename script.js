// Use ES module import syntax (works directly in browser)
import * as h3 from "https://cdn.jsdelivr.net/npm/h3-js@4.1.0/+esm";

// Initialize map
const map = L.map('map').setView([40.7128, -74.0060], 10);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Generate H3 hexagons
const resolution = 6;
const center = [40.7128, -74.0060];
const h3Index = h3.latLngToCell(center[0], center[1], resolution); 
const neighbors = h3.gridDisk(h3Index, 2); 
// Draw each hexagon
neighbors.forEach(index => {
  const boundary = h3.cellToBoundary(index, true);
  const latlngs = boundary.map(([lat, lng]) => [lat, lng]);

  L.polygon(latlngs, {
    color: 'blue',
    fillColor: 'skyblue',
    fillOpacity: 0.5,
    weight: 1
  }).addTo(map);
});
