import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Tests App ", () => {
  test("renders upload file button", () => {
    render(<App />);
    const uploadButton = screen.getByText(/upload json file/i);
    expect(uploadButton).toBeInTheDocument();
  });

  test("displays file title after uploading", () => {
    render(<App />);
    const file = new File(["{}"], "test.json", { type: "application/json" });
    const input = screen.getByLabelText("inputJsonFile");
    fireEvent.change(input, { target: { files: [file] } });
    const title = screen.getByText(/file title:/i);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toMatch(/test.json/i);
  });
});
