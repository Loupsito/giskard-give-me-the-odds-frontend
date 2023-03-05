import React, { useState } from "react";
import "./App.css";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [file, setFile] = useState(null);
  const [odds, setOdds] = useState(0);
  const [displayResult, setDisplayResult] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setOdds(0);
  };

  const handleButtonClick = async () => {
    const reader = new FileReader();
    setDisplayResult(true);

    reader.onload = async (event) => {
      const fileContent = event.target.result;
      const data = JSON.parse(fileContent);

      try {
        const response = await fetch("http://localhost:8000/give_me_the_odds", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ empire: data }),
        });

        const responseData = await response.json();
        setOdds(Number(responseData.value));
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  function handleRedoButtonClick() {
    setFile(null);
    setOdds(0);
    setDisplayResult(false);
  }

  return (
    <div className="upload-container">
      <h1>Upload json file</h1>
      <input
        aria-label="inputJsonFile"
        type="file"
        accept=".json"
        onChange={handleFileChange}
      />
      {!displayResult && file && (
        <button onClick={handleButtonClick}>Give me the odds</button>
      )}
      <div className="result">
        {displayResult && (
          <div>
            <p>
              {
                <CountUp
                  start={0}
                  end={odds}
                  duration={3}
                  suffix="%"
                  decimals={2}
                />
              }
            </p>
            <button onClick={handleRedoButtonClick} role="redo">
              Reset <FontAwesomeIcon icon={faRedo} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
