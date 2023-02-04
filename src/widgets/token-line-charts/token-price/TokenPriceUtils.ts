import { TokenMarketDataValues } from '../../../providers/MarketData';

import { PriceChartRangeOption, PriceChartData } from './TokenPrice';

interface PriceChange {
  abs: number;
  rel: number;
  isPositive: boolean;
}

/**
 * Max points for a chart before degradation in performance
 */
const MaxPointsPerRange: number = 200;

function getChartData(
  range: PriceChartRangeOption,
  prices: number[][][]
): PriceChartData[] {
  const hourlyDataInterval = 24;
  const pricesFromRange: any[] = prices.map((priceData: number[][]) => {
    return priceData.slice(-range * hourlyDataInterval) ?? [];
  });

  if (pricesFromRange.length < 1) {
    return [];
  }

  const chartData: PriceChartData[] = [];
  for (let i = 0; i < pricesFromRange[0].length; i += 1) {
    const y: number[] = [];

    for (let k = 0; k < pricesFromRange.length; k += 1) {
      const price: number =
        pricesFromRange[k][i] === undefined ? 0 : pricesFromRange[k][i][1];
      y.push(price);
    }

    const data: PriceChartData = {
      x: pricesFromRange[0][i][0],
      y: y[0],
    };

    chartData.push(data);
  }

  return chartData;
}

export function getPriceChartData(marketData: TokenMarketDataValues[]) {
  let ranges = [
    PriceChartRangeOption.DAILY_PRICE_RANGE,
    PriceChartRangeOption.WEEKLY_PRICE_RANGE,
    PriceChartRangeOption.MONTHLY_PRICE_RANGE,
    PriceChartRangeOption.QUARTERLY_PRICE_RANGE,
  ];

  const marketChartData: PriceChartData[][] = [];
  ranges.forEach((range) => {
    const prices = marketData.map((data) => data.hourlyPrices ?? []);
    const chartData = getChartData(range, prices);
    const trimmedData = trimArray(chartData, MaxPointsPerRange);
    marketChartData.push(trimmedData);
  });

  return marketChartData;
}

function getChangeInPrice(priceData: number[][]): PriceChange {
  if (priceData[0] === undefined) {
    return {
      abs: 0,
      rel: 0,
      isPositive: true,
    };
  }

  const firstPrice = priceData[0][1];
  const lastPrice = priceData.slice(-1)[0][1];
  const diff = lastPrice - firstPrice;

  const abs = Math.abs(diff);
  const isPositive = diff >= 0;
  const rel = (abs / firstPrice) * 100;

  return {
    abs,
    rel,
    isPositive,
  };
}

export function getFormattedChartPriceChanges(priceChanges: PriceChange[]) {
  const priceChangesFormatted = priceChanges.map((change) => {
    const plusOrMinus = change.isPositive ? '' : '-';
    return {
      label: `${plusOrMinus}${change.rel.toFixed(2)}%`,
      isPositive: change.isPositive,
    };
  });
  return priceChangesFormatted;
}

export function getPricesChanges(priceData: number[][]): PriceChange[] {
  const hourlyDataInterval = 24;
  let ranges = [
    PriceChartRangeOption.DAILY_PRICE_RANGE,
    PriceChartRangeOption.WEEKLY_PRICE_RANGE,
    PriceChartRangeOption.MONTHLY_PRICE_RANGE,
    PriceChartRangeOption.QUARTERLY_PRICE_RANGE,
  ];

  const changes: PriceChange[] = [];
  ranges.forEach((range) => {
    const prices = priceData.slice(-range * hourlyDataInterval);
    const change = getChangeInPrice(prices);
    changes.push(change);
  });

  return changes;
}

/**
 * Trim an array from an arbitrary length to a fixed length
 * If fixed length is greater than array, return array
 */
function trimArray(array: any[], fixedLength: number) {
  if (array.length < fixedLength) return array;

  const step = array.length / fixedLength;
  const newArray = [];

  for (let i = 0; i < fixedLength; i += 1) {
    const index = Math.floor(i * step);
    newArray.push(array[index]);
  }

  return newArray;
}
