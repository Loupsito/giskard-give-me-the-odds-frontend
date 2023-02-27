import React, { useState } from 'react';
import "./App.css"

function App() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setTitle(file.name);
  }

  return (
      <div className="upload-container">
        <h1>Upload json file</h1>
        <input aria-label="inputJsonFile" type="file" accept=".json" onChange={handleFileChange} />
        <div className="result">
          {title && <h2>File Title: {title}</h2>}
        </div>
      </div>
  );
}

export default App;
