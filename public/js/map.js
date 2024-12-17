mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
.setLngLat(coordinates)
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<p>Exact Location Provided After Booking</p>`)
.setMaxWidth("300px"))
.addTo(map);