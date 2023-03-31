import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Token } from '../../constants/tokens';
import { colors } from '../../styles/colors';
import { ChartDatas } from '../../utils/chart';

import TokenAprsChartTooltip from './TokenAprsChartTooltip';

const TokenAprsChart = ({
  chartDatas,
  token,
}: {
  chartDatas: ChartDatas;
  token: Token;
}) => {
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
        <LineChart data={chartData}>
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
            domain={['auto', 'auto']}
            tickFormatter={yAxisTickFormatter}
            tickLine={false}
          />
          <Tooltip content={<TokenAprsChartTooltip token={token} />} />
          <Line
            type='monotone'
            dataKey='y'
            stroke={colors.icBlue}
            fill={colors.icBlue}
            dot={false}
          />
          <Line
            type='monotone'
            dataKey='y2'
            stroke={colors.icGray4}
            fill={colors.icGray4}
            dot={false}
          />
          <Line
            type='monotone'
            dataKey='y3'
            stroke={colors.icGray3}
            fill={colors.icGray3}
            dot={false}
          />
          <Line
            type='monotone'
            dataKey='y4'
            stroke={colors.icGray2}
            fill={colors.icGray2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default TokenAprsChart;
