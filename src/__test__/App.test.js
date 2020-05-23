import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

it("renders without crashing", () => {
  const { container } = render(<App />);
  const buttons = container.querySelectorAll("button");

  expect(buttons.length).toBeGreaterThan(0);
});
