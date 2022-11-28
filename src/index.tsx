import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Find all widget divs (in production there will likely only be a single chart per element)
const WidgetDivs = document.querySelectorAll(".chart_widget");

// Inject our React App into each
WidgetDivs.forEach(Div => {
  ReactDOM.render(
    <React.StrictMode>
      <App domElement={Div} />
    </React.StrictMode>,
    Div
  );
});
