import React from "react";

import LineChart from "./widget/line-chart";
import PieChart from "./widget/pie-chart";

const App = ({ domElement }) => {
  const chartType = domElement.getAttribute("data-chart-type");

  switch (chartType) {
    case "line":
      return <LineChart />;
    case "pie":
      return <PieChart />;
    default:
      return <div>Unknown</div>;
  }
};

export default App;
