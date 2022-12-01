import React from 'react'

import { productTokensBySymbol } from "../../constants/tokens";
import { MarketDataProvider } from "../../providers/MarketData";

import TokenPrice from './token-price/TokenPrice'

const TokenLineCharts = ({ tokenSymbol }: { tokenSymbol: keyof typeof productTokensBySymbol }) => {
    const token = productTokensBySymbol[tokenSymbol]
    return (
        <MarketDataProvider>
            <TokenPrice token={token} />
        </MarketDataProvider>)
}

export default TokenLineCharts