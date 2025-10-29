// Initialize map
const map = L.map('map').setView([40.7128, -74.0060], 10); // New York

// Add basemap (use free provider like OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Generate H3 hexagons
const resolution = 6;
const center = [40.7128, -74.0060];
const h3Index = h3.geoToH3(center[0], center[1], resolution);
const kRing = h3.kRing(h3Index, 2); // neighboring hexes

// Draw hexagons on map
kRing.forEach(index => {
  const boundary = h3.h3ToGeoBoundary(index, true);
  const latlngs = boundary.map(([lat, lng]) => [lat, lng]);
  L.polygon(latlngs, {
    color: 'blue',
    fillColor: 'skyblue',
    fillOpacity: 0.4,
    weight: 1
  }).addTo(map);
});
