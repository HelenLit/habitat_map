// Initialize Leaflet map
const map = L.map('map').setView([40.7128, -74.0060], 10);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Use H3 to generate hexagons
const resolution = 6;
const center = [40.7128, -74.0060];
const h3Index = h3.geoToH3(center[0], center[1], resolution);
const neighbors = h3.kRing(h3Index, 2);

// Draw each hexagon as a Leaflet polygon
neighbors.forEach(index => {
  const boundary = h3.h3ToGeoBoundary(index, true);
  const latlngs = boundary.map(([lat, lng]) => [lat, lng]);

  L.polygon(latlngs, {
    color: 'blue',
    fillColor: 'skyblue',
    fillOpacity: 0.5,
    weight: 1
  }).addTo(map);
});
