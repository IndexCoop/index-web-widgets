import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Skeleton, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Token } from '../../constants/tokens';
import { colors } from '../../styles/colors';
import {
  CategoricalChartState,
  ChartChange,
  ChartDatas,
  DurationIndex,
} from '../../utils/chart';
import {
  getDayOfMonth,
  getFullDayOfWeek,
  getFullMonth,
} from '../../utils/time';

import TokenAprsChartTooltip from './TokenAprsChartTooltip';

const AprDisplay = ({
  initialApr,
  initialChange,
  initialColor,
  chartState,
}: {
  initialApr: string;
  initialChange: string;
  initialColor: string;
  chartState?: CategoricalChartState;
}) => {
  const now = new Date();
  const initialDate = `${getFullDayOfWeek(now)}, ${getFullMonth(
    now
  )} ${getDayOfMonth(now)}`;
  const [date, setDate] = useState<string>(initialDate);
  const [apr, setApr] = useState<string>(initialApr);
  const [change, setChange] = useState<string>(initialChange);
  const [color, setColor] = useState<string>(initialColor);

  // Handle updates to initial values
  useEffect(() => {
    setApr(initialApr);
  }, [initialApr]);
  useEffect(() => {
    setChange(initialChange);
  }, [initialChange]);
  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  // Triggered on both handleMouseMove and handleMouseLeave
  useEffect(() => {
    // handleMouseMove
    const { activePayload, isTooltipActive } = chartState ?? {};
    if (activePayload?.length && isTooltipActive) {
      const { x: date, y: apr } = activePayload[0]?.payload;

      const then = new Date(date);
      setDate(
        `${getFullDayOfWeek(then)}, ${getFullMonth(then)} ${getDayOfMonth(
          then
        )}`
      );

      setApr(`${apr.toFixed(2)}`);

      const diff = Number(initialApr.replace(/,/g, '')) - apr;
      const abs = Math.abs(diff);
      const isPositive = diff >= 0;
      const rel = (abs / apr) * 100;
      const plusOrMinus = isPositive ? '' : '-';
      setChange(`${plusOrMinus}${rel.toFixed(2)}%`);

      const aprChangeColor = isPositive ? colors.icMalachite : colors.icRed;
      setColor(aprChangeColor);
    }

    // handleMouseLeave
    if (!isTooltipActive) {
      setDate(initialDate);
      setApr(initialApr);
      setChange(initialChange);
      setColor(initialColor);
    }
  }, [chartState]);

  return (
    <Flex flexDirection='column' width='100%'>
      <Text fontSize='sm' margin='0' color={colors.gray[500]}>
        {date}
      </Text>
      <Flex
        flexDirection='row'
        alignItems='center'
        gap={['10px', '25px']}
        width='100%'
      >
        <Skeleton isLoaded={apr !== '0.00'}>
          <Text
            fontSize={['2xl', '3xl', '4xl']}
            margin='0'
            color={colors.black}
          >
            {`${apr}%`}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={apr !== '0.00'}>
          <Text fontSize='sm' margin='0' color={color}>
            {change}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
};

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
  initialApr,
  aprChanges,
  token,
}: {
  chartDatas: ChartDatas[];
  initialApr: string;
  aprChanges: ChartChange[];
  token: Token;
}) => {
  const strokeColor = colors.gray[500];
  const chartHeight = window.outerWidth < 400 ? 300 : 400;
  const displayYAxis = window.outerWidth < 500 ? true : false;

  const [chartData, setChartData] = useState<ChartDatas>([]);
  const [durationIndexSelector, setDurationIndexelector] = useState<number>(
    DurationIndex.QUARTERLY
  );
  const [chartState, setChartState] = useState<CategoricalChartState>();

  useEffect(() => {
    if (chartDatas.length < 1) {
      return;
    }
    const index = durationIndexSelector;
    const chartData = chartDatas[index];
    setChartData(chartData);
  }, [chartDatas, durationIndexSelector]);

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

  // Update Display to tooltip values
  const handleMouseMove = (state: CategoricalChartState) => {
    setChartState(state);
  };

  // Update Display to current
  const handleMouseLeave = () => {
    const resetState: CategoricalChartState = {
      activePayload: [
        {
          value: Number(initialApr),
          payload: {
            x: new Date().getTime(),
            y: Number(initialApr),
          },
        },
      ],
      isTooltipActive: false,
    };
    setChartState(resetState);
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
    return `${parseFloat(val).toFixed(2)}%`;
  };

  const aprChange = aprChanges[durationIndexSelector];
  const aprChangeColor = aprChange.isPositive
    ? colors.icMalachite
    : colors.icRed;

  const firstDataPoint = chartData[0];

  return (
    <Flex
      direction='column'
      alignItems='center'
      padding={['0.5em', '1em']}
      borderRadius='10px'
      boxShadow='0 0 0 1px rgba(20, 23, 48, 0.1), 0 2px 4px 0 rgba(20, 23, 48, 0.05)'
    >
      {/* Display & Controls */}
      <Flex
        direction={['column', 'row']}
        alignItems={['left', 'flex-end']}
        mb='24px'
        width={['100%', '90%']}
      >
        <AprDisplay
          initialApr={initialApr}
          initialChange={aprChange.label}
          initialColor={aprChangeColor}
          chartState={chartState}
        />
        <Box mt={['8px', '0']} mr='auto' ml={['0', '15px']}>
          <RangeSelector onChange={onChangeDuration} />
        </Box>
      </Flex>

      {/* Chart */}
      <ResponsiveContainer width={'95%'} height={chartHeight}>
        <LineChart
          data={chartData}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
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
            hide={displayYAxis}
          />
          <Tooltip content={<TokenAprsChartTooltip token={token} />} />
          <Line
            type='monotone'
            dataKey='y'
            stroke={colors.icBlue}
            fill={colors.icBlue}
            dot={false}
          />
          {firstDataPoint?.oseth && (
            <Line
              type='monotone'
              dataKey='oseth'
              stroke={colors.icBlue2}
              fill={colors.icBlue2}
              dot={false}
            />
          )}
          {firstDataPoint?.reth && (
            <Line
              type='monotone'
              dataKey='reth'
              stroke={colors.icGray3}
              fill={colors.icGray3}
              dot={false}
            />
          )}
          {firstDataPoint?.wsteth && (
            <Line
              type='monotone'
              dataKey='wsteth'
              stroke={colors.icGray2}
              fill={colors.icGray2}
              dot={false}
            />
          )}
          {firstDataPoint?.sfrxeth && (
            <Line
              type='monotone'
              dataKey='sfrxeth'
              stroke={colors.icBlue3}
              fill={colors.icBlue3}
              dot={false}
            />
          )}
          {firstDataPoint?.sweth && (
            <Line
              type='monotone'
              dataKey='sweth'
              stroke={colors.icBlue5}
              fill={colors.icBlue5}
              dot={false}
            />
          )}
          {firstDataPoint?.dseth && (
            <Line
              type='monotone'
              dataKey='dseth'
              stroke={colors.icGray4}
              fill={colors.icGray4}
              dot={false}
            />
          )}
          {firstDataPoint?.eeth && (
            <Line
              type='monotone'
              dataKey='eeth'
              stroke={colors.icBlue4}
              fill={colors.icBlue4}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default TokenAprsChart;
