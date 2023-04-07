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
  const [date, setDate] = useState<string>(
    `${getFullDayOfWeek(now)}, ${getFullMonth(now)} ${getDayOfMonth(now)}`
  );
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

      const diff = Number(initialApr) - apr;
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

  // Update AprDisplay to tooltip values
  const handleMouseMove = (state: CategoricalChartState) => {
    setChartState(state);
  };

  // Update AprDisplay to current
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
    return `${parseInt(val)}%`;
  };

  const aprChange = aprChanges[durationIndexSelector];
  const aprChangeColor = aprChange.isPositive
    ? colors.icMalachite
    : colors.icRed;

  return (
    <Flex direction='column' alignItems='center' width='100%'>
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
