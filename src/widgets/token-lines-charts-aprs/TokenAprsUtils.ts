import { GtcDsEthAprRow } from '../../hooks/useGtcDsEthAprs';
import { ChartDatas } from '../../utils/chart';

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
