export interface ChartOption {
  width?: number;
  height?: number;
  hideYAxis?: boolean;
  lineColor?: string;
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
