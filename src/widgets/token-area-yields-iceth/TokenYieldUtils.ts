import { IcEthYieldRow } from '../../hooks/useIcEthYields';
import {
  ChartDataPoint,
  ChartDatas,
  ChartRangeOption,
  DataChange,
  HourlyDataInterval,
} from '../../utils/chart';
import { trimArray } from '../../utils/helpers';

export const currentNetYield = (chartDatas: ChartDatas): string => {
  return `${chartDatas.slice(-1)[0]['y'].toFixed(2)}`;
};

/**
 * Approximate max points for these line charts before experiencing degradation in performance
 */
export const MaxPointsPerRange: number = 200;

/**
 * Filter the chart data for desired range
 */
function filterChartDataForRange(
  range: ChartRangeOption,
  chartDatas: ChartDatas
): ChartDatas {
  const chartDatasForRange: ChartDatas =
    chartDatas.slice(-range * HourlyDataInterval) ?? [];

  if (chartDatasForRange.length < 1) {
    return [];
  }

  return chartDatasForRange;
}

/**
 * Data parsing for Display component
 */
export function dataChangeForDurations(chartDatas: ChartDatas): DataChange[] {
  let ranges = [
    ChartRangeOption.DAILY_PRICE_RANGE,
    ChartRangeOption.WEEKLY_PRICE_RANGE,
    ChartRangeOption.MONTHLY_PRICE_RANGE,
    ChartRangeOption.QUARTERLY_PRICE_RANGE,
  ];

  const changes: DataChange[] = [];
  ranges.forEach((range) => {
    const points = chartDatas.slice(-range * HourlyDataInterval);
    const change = parseChangeInPoints(points);
    changes.push(change);
  });

  return changes;
}

/**
 * Data parsing for Display component
 */
export function formatDataChangeForDurations(priceChanges: DataChange[]) {
  const priceChangesFormatted = priceChanges.map((change) => {
    const plusOrMinus = change.isPositive ? '' : '-';
    return {
      label: `${plusOrMinus}${change.rel.toFixed(2)}%`,
      isPositive: change.isPositive,
    };
  });
  return priceChangesFormatted;
}

/**
 * Map API data to chart format
 */
export const mapYieldsToChartData = (yields: IcEthYieldRow[]): ChartDatas => {
  return yields
    .map((point) => ({
      x: Number(new Date(point.Hour)),
      y: point['Net Yield vs ETH'] * 100,
      y2: point['Net Yield vs stETH'] * 100,
    }))
    .sort((a, b) => {
      if (a.x < b.x) {
        return -1;
      }
      if (a.x > b.x) {
        return 1;
      }
      return 0;
    });
};

/**
 * Data parsing for Display component
 */
function parseChangeInPoints(points: ChartDataPoint[]): DataChange {
  if (points[0] === undefined) {
    return {
      abs: 0,
      rel: 0,
      isPositive: true,
    };
  }

  const firstPoint = points[0].y;
  const lastPoint = points.slice(-1)[0].y;
  const diff = lastPoint - firstPoint;

  const abs = Math.abs(diff);
  const isPositive = diff >= 0;
  const rel = (abs / firstPoint) * 100;

  return {
    abs,
    rel,
    isPositive,
  };
}

/**
 * Parse the chart data for all durations
 */
export function parseChartDataForDurations(chartDatas: ChartDatas) {
  const ranges = [
    ChartRangeOption.DAILY_PRICE_RANGE,
    ChartRangeOption.WEEKLY_PRICE_RANGE,
    ChartRangeOption.MONTHLY_PRICE_RANGE,
    ChartRangeOption.QUARTERLY_PRICE_RANGE,
  ];

  const chartDatasForDurations: ChartDatas[] = [];
  ranges.forEach((range) => {
    const chartData = filterChartDataForRange(range, chartDatas);
    const trimmedData = trimArray(chartData, MaxPointsPerRange);
    chartDatasForDurations.push(trimmedData);
  });

  return chartDatasForDurations;
}
