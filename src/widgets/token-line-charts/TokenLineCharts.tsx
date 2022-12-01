import React, { useEffect, useState } from "react";

import { productTokensBySymbol } from "../../constants/tokens";
import { fetchMarketData, TokenMarketDataValues } from "../../providers/MarketData";

import TokenPrice from "./token-price/TokenPrice";

const TokenLineCharts = ({ tokenSymbol }: { tokenSymbol: keyof typeof productTokensBySymbol }) => {
    const [marketData, setMarketData] = useState<TokenMarketDataValues>({});
    const token = productTokensBySymbol[tokenSymbol];

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMarketData(token.coingeckoId);
            setMarketData(data);
        };
        fetchData();
    }, []);

    return <TokenPrice marketData={marketData} />;
};

export default TokenLineCharts;
