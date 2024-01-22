async function getISS() {
  const req = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
  const data = await req.json();

  const lat = data.latitude
  const lon = data.longitude
  const vel = data.velocity.toFixed(1)
  
  document.getElementById('lat').textContent = lat;
  document.getElementById('lon').textContent = lon;
  document.getElementById('vel').textContent = vel + ' km/h';

  const map = L.map('map').setView([lat, lon], 2);
  const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const tile = L.tileLayer(tileURL, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })
  tile.addTo(map)
  const myIcon = L.icon({
    iconUrl: 'ISS.svg',
    iconSize: [100, 100],
    iconAnchor: [22, 94],
});
  const marker = L.marker([lat, lon], {icon: myIcon}).addTo(map);
  marker.setLatLng([lat, lon]);
}
setInterval(getISS, 1000);
window.onload = getISS()