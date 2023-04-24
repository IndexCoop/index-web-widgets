/**
 * Partial Rechart Type for CategoricalChartState
 */
export interface CategoricalChartStatePayload {
  value: number;
  payload: ChartDataPoint;
}
export interface CategoricalChartState {
  activePayload: CategoricalChartStatePayload[];
  isTooltipActive?: boolean;
}

export interface ChartChange {
  label: string;
  isPositive: boolean;
}

export type ChartDatas = ChartDataPoint[];

export interface ChartDataPoint {
  x: number;
  y: number;
  y2?: number;
  y3?: number;
  y4?: number;
  y5?: number;
}

export interface ChartOption {
  width?: number;
  height?: number;
  hideYAxis?: boolean;
  lineColor?: string;
}

export enum ChartRangeOption {
  DAILY_PRICE_RANGE = 1,
  WEEKLY_PRICE_RANGE = 7,
  MONTHLY_PRICE_RANGE = 30,
  QUARTERLY_PRICE_RANGE = 90,
}

export interface DataChange {
  abs: number;
  rel: number;
  isPositive: boolean;
}

export enum DurationIndex {
  DAILY = 0,
  WEEKLY = 1,
  MONTHLY = 2,
  QUARTERLY = 3,
}

export const DailyDataInterval = 1;
export const HourlyDataInterval = 24;
