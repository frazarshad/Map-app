import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

const Map = ({ markers, updateMarkers, mapView, setMapView }) => {
  const MapEventHandler = ({ onClickEvent }) => {
    const map = useMapEvents({
      click: onClickEvent,
      dragend: () =>
        setMapView((view) => ({ ...view, center: map.getCenter() })),
      zoom: () => setMapView((view) => ({ ...view, zoom: map.getZoom() })),
    });
    map.setZoom(mapView.zoom);
    map.setView(mapView.center);
    return null;
  };

  const addMarker = (e) => {
    updateMarkers((markers) => [...markers, [e.latlng.lat, e.latlng.lng]]);
  };

  const deleteMarker = (index) => {
    updateMarkers((markers) => markers.filter((_, i) => i !== index));
  };
  return (
    <MapContainer
      center={[mapView.center.lat, mapView.center.lng]}
      zoom={mapView.zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventHandler onClickEvent={addMarker} />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          eventHandlers={{
            contextmenu: () => {
              deleteMarker(index);
            },
          }}
          position={marker}
        ></Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
