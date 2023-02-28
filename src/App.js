import React, { useState } from "react";
import "./App.css";
import CountUp from "react-countup";

function App() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [odds, setOdds] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setTitle(file.name);
    setOdds("");
  };

  const handleButtonClick = () => {
    setOdds("0");
  };

  return (
    <div className="upload-container">
      <h1>Upload json file</h1>
      <input
        aria-label="inputJsonFile"
        type="file"
        accept=".json"
        onChange={handleFileChange}
      />
      {title && !odds && (
        <button onClick={handleButtonClick}>Give me the odds</button>
      )}
      <div className="result">
        {odds && (
          <p>{<CountUp start={0} end={100} duration={3} suffix="%" />}</p>
        )}
      </div>
    </div>
  );
}

export default App;
