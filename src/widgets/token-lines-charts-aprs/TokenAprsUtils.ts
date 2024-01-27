import { GtcDsEthAprRow } from '../../hooks/useGtcDsEthAprs';
import {
  ChartDataPoint,
  ChartDatas,
  ChartRangeOption,
  DataChange,
  HourlyDataInterval,
} from '../../utils/chart';
import { trimArray } from '../../utils/helpers';

export const currentApr = (chartDatas: ChartDatas): string => {
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
export const mapAprsToChartData = (aprs: GtcDsEthAprRow[]): ChartDatas => {
  return aprs
    .map((point) => ({
      x: Number(new Date(point.hour)),
      y: point['ma_apr_7d_txt'] * 100,
      oseth: point['ma_apr_7d_oseth'] * 100,
      reth: point['ma_apr_7d_reth'] * 100,
      wsteth: point['ma_apr_7d_wsteth'] * 100,
      sfrxeth: point['ma_apr_7d_sfrxeth'] * 100,
      eeth: point['ma_apr_7d_eeth'] * 100,
      sweth: point['ma_apr_7d_sweth'] * 100,
      dseth: point['ma_apr_7d_dseth'] * 100,
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
