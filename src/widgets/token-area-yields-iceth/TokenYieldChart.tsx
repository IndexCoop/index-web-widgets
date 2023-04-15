import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Skeleton, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
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

import TokenYieldChartTooltip from './TokenYieldChartTooltip';

const NetYieldDisplay = ({
  initialNetYield,
  initialChange,
  initialColor,
  chartState,
}: {
  initialNetYield: string;
  initialChange: string;
  initialColor: string;
  chartState?: CategoricalChartState;
}) => {
  const now = new Date();
  const initialDate = `${getFullDayOfWeek(now)}, ${getFullMonth(
    now
  )} ${getDayOfMonth(now)}`;
  const [date, setDate] = useState<string>(initialDate);
  const [netYield, setNetYield] = useState<string>(initialNetYield);
  const [change, setChange] = useState<string>(initialChange);
  const [color, setColor] = useState<string>(initialColor);

  // Handle updates to initial values
  useEffect(() => {
    setNetYield(initialNetYield);
  }, [initialNetYield]);
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
      const { x: date, y: netYield } = activePayload[0]?.payload;

      const then = new Date(date);
      setDate(
        `${getFullDayOfWeek(then)}, ${getFullMonth(then)} ${getDayOfMonth(
          then
        )}`
      );

      setNetYield(`${netYield.toFixed(2)}`);

      const diff = Number(initialNetYield.replace(/,/g, '')) - netYield;
      const abs = Math.abs(diff);
      const isPositive = diff >= 0;
      const rel = (abs / netYield) * 100;
      const plusOrMinus = isPositive ? '' : '-';
      setChange(`${plusOrMinus}${rel.toFixed(2)}%`);

      const netYieldChangeColor = isPositive
        ? colors.icMalachite
        : colors.icRed;
      setColor(netYieldChangeColor);
    }

    // handleMouseLeave
    if (!isTooltipActive) {
      setDate(initialDate);
      setNetYield(initialNetYield);
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
        <Skeleton isLoaded={netYield !== '0.00'}>
          <Text
            fontSize={['2xl', '3xl', '4xl']}
            margin='0'
            color={colors.black}
          >
            {`${netYield}%`}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={netYield !== '0.00'}>
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

const TokenYieldChart = ({
  chartDatas,
  initialNetYield,
  netYieldChanges,
}: {
  chartDatas: ChartDatas[];
  initialNetYield: string;
  netYieldChanges: ChartChange[];
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
          value: Number(initialNetYield),
          payload: {
            x: new Date().getTime(),
            y: Number(initialNetYield),
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

  const netYieldChange = netYieldChanges[durationIndexSelector];
  const netYieldChangeColor = netYieldChange.isPositive
    ? colors.icMalachite
    : colors.icRed;

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
        <NetYieldDisplay
          initialNetYield={initialNetYield}
          initialChange={netYieldChange.label}
          initialColor={netYieldChangeColor}
          chartState={chartState}
        />
        <Box mt={['8px', '0']} mr='auto' ml={['0', '15px']}>
          <RangeSelector onChange={onChangeDuration} />
        </Box>
      </Flex>

      {/* Chart */}
      <ResponsiveContainer width={'95%'} height={chartHeight}>
        <AreaChart
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
            domain={[0, (dataMax: number) => dataMax * 1.1]}
            tickFormatter={yAxisTickFormatter}
            tickLine={false}
            hide={displayYAxis}
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
