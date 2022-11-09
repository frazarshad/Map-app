import Controls from "./Controls";
import Map from "./Map";
import "./App.css";
import { useState } from "react";

function App() {
  const [markers, setMarkers] = useState([]);
  const [mapView, setMapView] = useState({
    center: { lat: 0.0, lng: 0.0 },
    zoom: 13,
  });

  const addBatchToMarkers = (batch) => {
    setMarkers((markers) => [...markers, ...batch]);
  };

  const performExport = () => {
    const dataToExport = {
      markers,
      mapView,
    };

    const dataToExportString = JSON.stringify(dataToExport);
    const dataToExportBlob = new Blob([dataToExportString], {
      type: "application/json",
    });
    const dataToExportUrl = URL.createObjectURL(dataToExportBlob);
    const link = document.createElement("a");
    link.download = "export.json";
    link.href = dataToExportUrl;
    link.click();
  };

  const performImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        setMarkers(data.markers);
        setMapView(data.mapView);
      };
      reader.readAsText(file);
    };
    fileInput.click();
  };
  return (
    <>
      <Controls
        addBatchToMarkers={addBatchToMarkers}
        performExport={performExport}
        performImport={performImport}
      />
      <Map
        markers={markers}
        updateMarkers={setMarkers}
        mapView={mapView}
        setMapView={setMapView}
      />
    </>
  );
}

export default App;
