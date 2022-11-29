import React from "react";

import LineChartExample from "./widgets/LineChartExample";
import PieChartExample from "./widgets/PieChartExample";

const App = ({ domElement }: { domElement: Element }) => {
  const chartType = domElement.getAttribute("data-chart-type");

  switch (chartType) {
    case "line":
      return <LineChartExample />;
    case "pie":
      return <PieChartExample />;
    default:
      return <div>Unknown</div>;
  }
};

export default App;
