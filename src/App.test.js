import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import TwainApp from "./App";

it("renders learn react link", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TwainApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
