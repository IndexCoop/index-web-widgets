import React from "react";

import { productTokensBySymbol } from "./constants/tokens";
import LineChartExample from "./widgets/LineChartExample";
import PieChartExample from "./widgets/PieChartExample";
import TokenAllocations from "./widgets/token-allocations/TokenAllocations";
import TokenLineCharts from "./widgets/token-line-charts/TokenLineCharts";

const App = ({ domElement }: { domElement: Element }) => {
  const widgetType = domElement.getAttribute("data-widget-type");
  const tokenSymbol = domElement.getAttribute("data-token-symbol") as keyof typeof productTokensBySymbol;

  switch (widgetType) {
    case "chart-line":
      return <LineChartExample />;
    case "chart-pie":
      return <PieChartExample />;
    case "chart-token-allocation":
      return <TokenAllocations tokenSymbol={tokenSymbol} />;
    case "chart-token-line":
      return <TokenLineCharts tokenSymbol={tokenSymbol} />;
    default:
      console.warn(`[Index Web Widgets]: Unknown widget of type ${widgetType}`)
  }
};

export default App;
