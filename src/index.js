import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
    <div id="creador">Hecho por Ilemar Andrade</div>
  </React.StrictMode>,
  rootElement
);
