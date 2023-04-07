import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { colors } from '../../styles/colors';
import { ChartDatas } from '../../utils/chart';

import TokenYieldChartTooltip from './TokenYieldChartTooltip';

const TokenYieldChart = ({ chartDatas }: { chartDatas: ChartDatas }) => {
  const strokeColor = colors.gray[500];
  const chartHeight = window.outerWidth < 400 ? 300 : 400;

  const [chartData, setChartData] = useState<ChartDatas>([]);

  useEffect(() => {
    if (chartDatas.length < 1) {
      return;
    }
    setChartData(chartDatas);
  }, [chartDatas]);

  const xAxisTickFormatter = (val: any | null | undefined) => {
    return new Date(val).toLocaleString(undefined, {
      month: 'short',
      day: '2-digit',
    });
  };

  const yAxisTickFormatter = (val: any | null | undefined) => {
    if (val === undefined || val === null) {
      return '';
    }
    return `${parseInt(val)}%`;
  };

  return (
    <Flex direction='column' alignItems='center' width='100%'>
      {/* Chart */}
      <ResponsiveContainer width={'95%'} height={chartHeight}>
        <AreaChart data={chartData}>
          <CartesianGrid
            stroke={strokeColor}
            strokeOpacity={0.2}
            vertical={false}
          />
          <XAxis
            dataKey='x'
            axisLine={false}
            interval='preserveStart'
            minTickGap={100}
            tickFormatter={xAxisTickFormatter}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            domain={[0, (dataMax: number) => dataMax * 1.1]}
            tickFormatter={yAxisTickFormatter}
            tickLine={false}
          />
          <Tooltip content={<TokenYieldChartTooltip />} />
          <Area
            type='monotone'
            dataKey='y'
            stroke={colors.icBlue}
            fill={colors.icBlue}
          />
          <Area
            type='monotone'
            dataKey='y2'
            stroke={colors.icBlue2}
            fill={colors.icBlue2}
          />
          <Area
            type='monotone'
            dataKey='y3'
            stroke={colors.icBlue4}
            fill={colors.icBlue4}
          />
          <Area
            type='monotone'
            dataKey='y4'
            stroke={colors.icBlue6}
            fill={colors.icBlue6}
          />
          <Area
            type='monotone'
            dataKey='y5'
            stroke={colors.icBlue8}
            fill={colors.icBlue8}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default TokenYieldChart;
