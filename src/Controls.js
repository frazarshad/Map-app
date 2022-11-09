import { useState } from "react";

const Controls = ({ addBatchToMarkers, performExport, performImport }) => {
  const [batchAdd, setBatchAdd] = useState("");

  const submitBatchAdd = (e) => {
    const lines = batchAdd.split("\n");
    const coordinates = lines.map((line) => line.split(",").map(Number));
    const invalidValues = coordinates.filter(
      (val) => val.length !== 2 || isNaN(val[0]) || isNaN(val[1])
    );
    if (invalidValues.length > 0) {
      alert("Invalid values in batch add");
      setBatchAdd("");
      return;
    }
    addBatchToMarkers(coordinates);
    setBatchAdd("");
  };

  return (
    <>
      <div>
        <textarea
          onChange={(e) => setBatchAdd(e.target.value)}
          value={batchAdd}
        />
        <button onClick={submitBatchAdd}>Submit</button>
      </div>
      <div>
        <button onClick={performExport}>Export</button>
        <button onClick={performImport}>Import</button>
      </div>
    </>
  );
};

export default Controls;
