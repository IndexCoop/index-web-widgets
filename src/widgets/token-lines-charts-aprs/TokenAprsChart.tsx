import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
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
import { ChartDatas, DurationIndex } from '../../utils/chart';

import TokenAprsChartTooltip from './TokenAprsChartTooltip';

const RangeSelector = ({ onChange }: { onChange: (index: number) => void }) => (
  <Tabs
    variant='unstyled'
    size='sm'
    backgroundColor={colors.gray[100]}
    boxShadow='md'
    borderRadius='8px'
    defaultIndex={DurationIndex.QUARTERLY}
    onChange={onChange}
  >
    <TabList
      sx={{
        'button:first-child': {
          borderRadius: '16px 0 0 16px',
        },
        'button:last-child': {
          borderRadius: '0 16px 16px 0',
        },
      }}
    >
      <Tab _selected={{ color: colors.icBlue }} border='none'>
        1D
      </Tab>
      <Tab _selected={{ color: colors.icBlue }} border='none'>
        1W
      </Tab>
      <Tab _selected={{ color: colors.icBlue }} border='none'>
        1M
      </Tab>
      <Tab _selected={{ color: colors.icBlue }} border='none'>
        3M
      </Tab>
    </TabList>
  </Tabs>
);

const TokenAprsChart = ({
  chartDatas,
  token,
}: {
  chartDatas: ChartDatas[];
  token: Token;
}) => {
  const strokeColor = colors.gray[500];
  const chartHeight = window.outerWidth < 400 ? 300 : 400;

  const [chartData, setChartData] = useState<ChartDatas>([]);
  const [durationIndexSelector, setDurationIndexelector] = useState<number>(
    DurationIndex.QUARTERLY
  );

  useEffect(() => {
    if (chartDatas.length < 1) {
      return;
    }
    const index = durationIndexSelector;
    const chartData = chartDatas[index];
    setChartData(chartData);
  }, [durationIndexSelector, chartDatas]);

  const onChangeDuration = (index: number) => {
    switch (index) {
      case DurationIndex.DAILY:
        setDurationIndexelector(DurationIndex.DAILY);
        break;
      case DurationIndex.WEEKLY:
        setDurationIndexelector(DurationIndex.WEEKLY);
        break;
      case DurationIndex.MONTHLY:
        setDurationIndexelector(DurationIndex.MONTHLY);
        break;
      case DurationIndex.QUARTERLY:
        setDurationIndexelector(DurationIndex.QUARTERLY);
        break;
    }
  };

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
      {/* Display & Controls */}
      <Flex
        direction={['column', 'row']}
        alignItems={['left', 'flex-end']}
        mb='24px'
        width={['100%', '90%']}
      >
        <Box mt={['8px', '0']} mr='auto' ml={['0', '15px']}>
          <RangeSelector onChange={onChangeDuration} />
        </Box>
      </Flex>

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
