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

import { colors } from '../../../styles/colors';
import {
  getDayOfMonth,
  getFullDayOfWeek,
  getFullMonth,
} from '../../../utils/time';

import { Durations, MarketChartOptions, PriceChartData } from './TokenPrice';
import TokenPriceChartTooltip from './TokenPriceChartTooltip';

interface MarketChartPriceChange {
  label: string;
  isPositive: boolean;
}

/**
 * Partial Rechart Type for CategoricalChartState
 */
interface CategoricalChartStatePayload {
  value: number;
  payload: PriceChartData;
}
interface CategoricalChartState {
  activePayload: CategoricalChartStatePayload[];
  isTooltipActive?: boolean;
}

const PriceDisplay = ({
  initialPrice,
  initialChange,
  initialColor,
  chartState,
}: {
  initialPrice: string;
  initialChange: string;
  initialColor: string;
  chartState?: CategoricalChartState;
}) => {
  const now = new Date();
  const [date, setDate] = useState<string>(
    `${getFullDayOfWeek(now)}, ${getFullMonth(now)} ${getDayOfMonth(now)}`
  );
  const [price, setPrice] = useState<string>(initialPrice);
  const [change, setChange] = useState<string>(initialChange);
  const [color, setColor] = useState<string>(initialColor);

  // Handle updates to initial values
  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);
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
      const { x: date, y: price } = activePayload[0]?.payload;

      const then = new Date(date);
      setDate(
        `${getFullDayOfWeek(then)}, ${getFullMonth(then)} ${getDayOfMonth(
          then
        )}`
      );

      setPrice(`$${Number(price).toFixed(2)}`);

      const diff = Number(initialPrice) - price;
      const abs = Math.abs(diff);
      const isPositive = diff >= 0;
      const rel = (abs / price) * 100;
      const plusOrMinus = isPositive ? '' : '-';
      setChange(`${plusOrMinus}${rel.toFixed(2)}%`);

      const priceChangeColor = isPositive ? colors.icMalachite : colors.icRed;
      setColor(priceChangeColor);
    }

    // handleMouseLeave
    if (!isTooltipActive) {
      setPrice(initialPrice);
      setChange(initialChange);
      setColor(initialColor);
    }
  }, [chartState]);

  return (
    <Flex flexDirection='column' width='100%'>
      <Text fontSize={['sm']} color={colors.gray[500]}>
        {date}
      </Text>
      <Flex
        flexDirection='row'
        alignItems='center'
        gap={['10px', '25px']}
        width='100%'
      >
        <Skeleton isLoaded={price !== '0.00'}>
          <Text fontSize={['2xl', '3xl', '4xl']} color={colors.black}>
            {price}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={price !== '0.00'}>
          <Text fontSize={['sm']} color={color}>
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
    onChange={onChange}
  >
    <TabList>
      <Tab _selected={{ color: colors.icBlue }}>1D</Tab>
      <Tab _selected={{ color: colors.icBlue }}>1W</Tab>
      <Tab _selected={{ color: colors.icBlue }}>1M</Tab>
      <Tab _selected={{ color: colors.icBlue }}>3M</Tab>
    </TabList>
  </Tabs>
);

const TokenPriceChart = (props: {
  marketData: PriceChartData[][];
  currentPrice: string;
  priceChanges: MarketChartPriceChange[];
  options: MarketChartOptions;
}) => {
  const strokeColor = colors.gray[500];
  const chartHeight = window.outerWidth < 400 ? 300 : 400;

  const [chartData, setChartData] = useState<PriceChartData[]>([]);
  const [durationSelector, setDurationSelector] = useState<number>(
    Durations.DAILY
  );

  const [chartState, setChartState] = useState<CategoricalChartState>();

  useEffect(() => {
    if (props.marketData.length < 1) {
      return;
    }
    const index = durationSelector;
    const chartData = props.marketData[index];
    setChartData(chartData);
  }, [durationSelector, props.marketData]);

  const onChangeDuration = (index: number) => {
    switch (index) {
      case Durations.DAILY:
        setDurationSelector(Durations.DAILY);
        break;
      case Durations.WEEKLY:
        setDurationSelector(Durations.WEEKLY);
        break;
      case Durations.MONTHLY:
        setDurationSelector(Durations.MONTHLY);
        break;
      case Durations.QUARTERLY:
        setDurationSelector(Durations.QUARTERLY);
        break;
    }
  };

  // Update PriceDisplay to tooltip values
  const handleMouseMove = (state: CategoricalChartState) => {
    setChartState(state);
  };

  // Update PriceDisplay to current
  const handleMouseLeave = () => {
    const resetState: CategoricalChartState = {
      activePayload: [
        {
          value: Number(props.currentPrice),
          payload: {
            x: new Date().getTime(),
            y: Number(props.currentPrice),
          },
        },
      ],
      isTooltipActive: false,
    };
    setChartState(resetState);
  };

  const xAxisTickFormatter = (val: any | null | undefined) => {
    const dateFormatterOptions = (
      duration: Durations
    ): Intl.DateTimeFormatOptions => {
      switch (duration) {
        case Durations.DAILY:
          return {
            hour: '2-digit',
          };
        default:
          return {
            month: 'short',
            day: '2-digit',
          };
      }
    };

    var options = dateFormatterOptions(durationSelector);
    return new Date(val).toLocaleString(undefined, options);
  };

  const yAxisTickFormatter = (val: any | null | undefined) => {
    if (val === undefined || val === null) {
      return '';
    }
    return `$${parseInt(val)}`;
  };

  const minY = Math.min(...chartData.map<number>((data) => Math.min(data.y)));
  const maxY = Math.max(...chartData.map<number>((data) => Math.max(data.y)));
  const minYAdjusted = minY > 4 ? minY - 5 : 0;
  const yAxisDomain = [minYAdjusted, maxY + 5];

  const priceChange = props.priceChanges[durationSelector];
  const priceChangeColor = priceChange.isPositive
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
        <PriceDisplay
          initialPrice={props.currentPrice}
          initialChange={priceChange.label}
          initialColor={priceChangeColor}
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
          <YAxis
            axisLine={false}
            domain={yAxisDomain}
            stroke={strokeColor}
            tickCount={10}
            tickFormatter={yAxisTickFormatter}
            tickLine={false}
            hide={true}
          />
          <XAxis
            axisLine={false}
            dataKey='x'
            interval='preserveStart'
            minTickGap={100}
            stroke={strokeColor}
            tickCount={6}
            tickFormatter={xAxisTickFormatter}
            tickLine={false}
          />
          <Tooltip content={<TokenPriceChartTooltip />} />
          <Line
            type='monotone'
            dataKey='y'
            stroke={props.options.lineColor ?? colors.icBlue}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default TokenPriceChart;
