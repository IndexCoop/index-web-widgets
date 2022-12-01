import React from "react";

import { TokenMarketDataValues, selectLatestMarketData } from "../../../providers/MarketData";

import TokenPriceChart from "./TokenPriceChart";
import { getFormattedChartPriceChanges, getPriceChartData, getPricesChanges } from "./TokenPriceUtils";

const TokenPage = ({ marketData }: { marketData: TokenMarketDataValues }) => {
    const priceChartData = getPriceChartData([marketData]);

    const price = selectLatestMarketData(marketData.hourlyPrices).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const priceFormatted = `$${price}`;

    const priceChanges = getPricesChanges(marketData.hourlyPrices ?? []);
    const priceChangesFormatted = getFormattedChartPriceChanges(priceChanges);

    const chartWidth = window.outerWidth < 400 ? window.outerWidth : 648;
    const chartHeight = window.outerWidth < 400 ? 300 : 400;

    return (
        <TokenPriceChart
            marketData={priceChartData}
            prices={[priceFormatted]}
            priceChanges={priceChangesFormatted}
            options={{
                width: chartWidth,
                height: chartHeight,
                hideYAxis: false,
            }}
        />
    );
};

export default TokenPage;
