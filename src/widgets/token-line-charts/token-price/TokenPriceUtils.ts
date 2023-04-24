import { TokenMarketDataValues } from '../../../providers/MarketData';
import {
  ChartDatas,
  ChartDataPoint,
  ChartRangeOption,
  DataChange,
  HourlyDataInterval,
} from '../../../utils/chart';
import { trimArray } from '../../../utils/helpers';

/**
 * Approximate max points for these line charts before experiencing degradation in performance
 */
export const MaxPointsPerRange: number = 200;

/**
 * Get the chart data for a duration
 */
function getChartData(
  range: ChartRangeOption,
  prices: number[][][]
): ChartDatas {
  const pricesFromRange: any[] = prices.map((priceData: number[][]) => {
    return priceData.slice(-range * HourlyDataInterval) ?? [];
  });

  if (pricesFromRange.length < 1) {
    return [];
  }

  const chartData: ChartDatas = [];
  for (let i = 0; i < pricesFromRange[0].length; i += 1) {
    const y: number[] = [];

    for (let k = 0; k < pricesFromRange.length; k += 1) {
      const price: number =
        pricesFromRange[k][i] === undefined ? 0 : pricesFromRange[k][i][1];
      y.push(price);
    }

    const data: ChartDataPoint = {
      x: pricesFromRange[0][i][0],
      y: y[0],
    };

    chartData.push(data);
  }

  return chartData;
}

/**
 * Get the chart data for all durations
 */
export function getChartDataForDurations(marketData: TokenMarketDataValues[]) {
  let ranges = [
    ChartRangeOption.DAILY_PRICE_RANGE,
    ChartRangeOption.WEEKLY_PRICE_RANGE,
    ChartRangeOption.MONTHLY_PRICE_RANGE,
    ChartRangeOption.QUARTERLY_PRICE_RANGE,
  ];

  const marketChartData: ChartDatas[] = [];
  ranges.forEach((range) => {
    const prices = marketData.map((data) => data.hourlyPrices ?? []);
    const chartData = getChartData(range, prices);
    const trimmedData = trimArray(chartData, MaxPointsPerRange);
    marketChartData.push(trimmedData);
  });

  return marketChartData;
}

function getChangeInPrice(priceData: number[][]): DataChange {
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

export function getFormattedChartPriceChanges(priceChanges: DataChange[]) {
  const priceChangesFormatted = priceChanges.map((change) => {
    const plusOrMinus = change.isPositive ? '' : '-';
    return {
      label: `${plusOrMinus}${change.rel.toFixed(2)}%`,
      isPositive: change.isPositive,
    };
  });
  return priceChangesFormatted;
}

export function getPricesChanges(priceData: number[][]): DataChange[] {
  let ranges = [
    ChartRangeOption.DAILY_PRICE_RANGE,
    ChartRangeOption.WEEKLY_PRICE_RANGE,
    ChartRangeOption.MONTHLY_PRICE_RANGE,
    ChartRangeOption.QUARTERLY_PRICE_RANGE,
  ];

  const changes: DataChange[] = [];
  ranges.forEach((range) => {
    const prices = priceData.slice(-range * HourlyDataInterval);
    const change = getChangeInPrice(prices);
    changes.push(change);
  });

  return changes;
}
