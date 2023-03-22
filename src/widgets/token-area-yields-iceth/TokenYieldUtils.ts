import { IcEthYieldRow } from '../../hooks/useIcEthYields';
import { ChartDatas } from '../../utils/chart';

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
