import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import {act} from "react-dom/test-utils";

describe("App", () => {
  const mockResponse = { value: '81.00' };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
    );
  });

  test("Renders Upload json file heading", () => {
    render(<App />);
    const heading = screen.getByText(/Upload json file/i);
    expect(heading).toBeInTheDocument();
  });

  test("Renders input file element", () => {
    render(<App />);
    const inputFile = screen.getByLabelText(/inputJsonFile/i);
    expect(inputFile).toBeInTheDocument();
  });

  test("Does not display Give me the odds button when file is not selected", () => {
    render(<App />);
    const button = screen.queryByText(/Give me the odds/i);
    expect(button).not.toBeInTheDocument();
  });

  test("Displays Give me the odds button when file is selected", () => {
    render(<App />);
    const file = new File(["{}"], "test.json", {
      type: "application/json",
    });
    const inputFile = screen.getByLabelText(/inputJsonFile/i);
    fireEvent.change(inputFile, { target: { files: [file] } });

    const button = screen.getByText(/Give me the odds/i);
    expect(button).toBeInTheDocument();
  });

  test("Displays result when Give me the odds button is clicked", async () => {
    render(<App />);
    const file = new File(['{"name": "toto"}'], "test.json", {
      type: "application/json",
    });
    const inputFile = screen.getByLabelText(/inputJsonFile/i);
    fireEvent.change(inputFile, { target: { files: [file] } });

    const button = screen.getByText(/Give me the odds/i);
    fireEvent.click(button);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const result = await screen.findByText(/%/i);
    expect(result).toBeInTheDocument();
  });

  test("Resets state when reset button is clicked", async () => {
    render(<App />);
    const file = new File(['{"name": "titi"}'], "test.json", {
      type: "application/json",
    });
    const inputFile = screen.getByLabelText(/inputJsonFile/i);
    fireEvent.change(inputFile, { target: { files: [file] } });

    const button = screen.getByText(/Give me the odds/i);
    fireEvent.click(button);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const redoButton = screen.getByText(/Reset/i);
    fireEvent.click(redoButton);

    const odds = screen.queryByText(/%/i);
    expect(odds).not.toBeInTheDocument();
  });
});
