import React from "react";

import { productTokensBySymbol } from "./constants/tokens";
import LineChartExample from "./widgets/LineChartExample";
import PieChartExample from "./widgets/PieChartExample";
import TokenAllocations from "./widgets/token-allocations/TokenAllocations";

const App = ({ domElement }: { domElement: Element }) => {
  const chartType = domElement.getAttribute("data-chart-type");
  const tokenSymbol = domElement.getAttribute("data-token-symbol") as keyof typeof productTokensBySymbol;

  switch (chartType) {
    case "line":
      return <LineChartExample />;
    case "pie":
      return <PieChartExample />;
    case "token-allocation":
      return <TokenAllocations tokenSymbol={tokenSymbol} />;
    default:
      return <div>Unknown</div>;
  }
};

export default App;
