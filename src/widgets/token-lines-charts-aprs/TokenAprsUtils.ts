import { GtcDsEthAprRow } from '../../hooks/useGtcDsEthAprs';
import { ChartDatas, ChartRangeOption } from '../../utils/chart';

/**
 * Filter the chart data for desired range
 */
function filterChartDataForRange(
  range: ChartRangeOption,
  chartDatas: ChartDatas
): ChartDatas {
  const hourlyDataInterval = 24;
  const chartDatasForRange: ChartDatas =
    chartDatas.slice(-range * hourlyDataInterval) ?? [];

  if (chartDatasForRange.length < 1) {
    return [];
  }

  return chartDatasForRange;
}

/**
 * Map API data to chart format
 */
export const mapAprsToChartData = (aprs: GtcDsEthAprRow[]): ChartDatas => {
  return aprs
    .map((point) => ({
      x: Number(new Date(point.hour)),
      y: point['ma_apr_7d_txt'] * 100,
      y2: point['ma_apr_7d_seth2'] * 100,
      y3: point['ma_apr_7d_reth'] * 100,
      y4: point['ma_apr_7d_wsteth'] * 100,
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
    chartDatasForDurations.push(chartData);
  });

  return chartDatasForDurations;
}
