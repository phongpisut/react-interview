import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders", () => {
  render(<App />);
  const carAvailable = screen.getByText(/Car Available/i);
  expect(carAvailable).toBeInTheDocument();
});
