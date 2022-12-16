import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Tab, TabList, Tabs, Text, useTheme } from '@chakra-ui/react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { colors } from '../../../styles/colors';

import TokenPriceChartTooltip from './TokenPriceChartTooltip';

export enum Durations {
  DAILY,
  WEEKLY,
  MONTHLY,
  QUARTERLY,
  YEARLY,
}

export enum PriceChartRangeOption {
  DAILY_PRICE_RANGE = 1,
  WEEKLY_PRICE_RANGE = 7,
  MONTHLY_PRICE_RANGE = 30,
  QUARTERLY_PRICE_RANGE = 90,
  YEARLY_PRICE_RANGE = 365,
}

interface MarketChartOptions {
  width?: number;
  height?: number;
  hideYAxis?: boolean;
}

interface MarketChartPriceChange {
  label: string;
  isPositive: boolean;
}

export interface PriceChartData {
  x: number;
  y: number;
}

const PriceDisplay = ({
  price,
  change,
  color,
}: {
  price: string;
  change: string;
  color: string;
}) => (
  <Flex align='center' width='100%' alignItems={['', 'flex-end']}>
    <Flex align='baseline' flexDir={['column', 'column', 'column', 'row']}>
      <Flex flexDirection={'column'}>
        <Flex flexDirection={['row']} alignItems={['flex-end']}>
          <Text
            fontSize={['3xl', '3xl', '3xl', '4xl']}
            color={colors.icBlue}
            fontWeight='700'
          >
            {price}
          </Text>
        </Flex>
        <Text
          fontSize={['md', 'md', 'xl', '2xl']}
          color={color}
          fontWeight='700'
        >
          {change}
        </Text>
      </Flex>
    </Flex>
  </Flex>
);

const RangeSelector = ({ onChange }: { onChange: (index: number) => void }) => (
  <Tabs variant='unstyled' onChange={onChange}>
    <TabList>
      {/* <Tab>1H</Tab> */}
      {/* TODO? overkill?*/}
      <Tab>1D</Tab>
      <Tab>1W</Tab>
      <Tab>1M</Tab>
      <Tab>3M</Tab>
      {/* TODO <Tab>1Y</Tab> */}
    </TabList>
  </Tabs>
);

const TokenPriceChart = (props: {
  marketData: PriceChartData[][];
  prices: string[];
  priceChanges: MarketChartPriceChange[];
  options: MarketChartOptions;
}) => {
  const theme = useTheme();
  const strokeColor = colors.gray[500];

  const [chartData, setChartData] = useState<PriceChartData[]>([]);
  const [durationSelector, setDurationSelector] = useState<number>(
    Durations.DAILY
  );

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
      case Durations.YEARLY:
        setDurationSelector(Durations.YEARLY);
        break;
    }
  };

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

  const xAxisTickFormatter = (val: any | null | undefined) => {
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

  const price =
    props.prices.length === 1
      ? props.prices[0]
      : props.prices[durationSelector];
  const priceChange = props.priceChanges[durationSelector];
  const priceChangeColor = priceChange.isPositive
    ? colors.icMalachite
    : colors.icRed;

  return (
    <Flex direction='column' alignItems='center' width='100%'>
      <Flex
        direction={['column', 'row']}
        alignItems={['left', 'flex-end']}
        mb='24px'
        width={props.options.width ?? 900}
      >
        <PriceDisplay
          price={price}
          change={priceChange.label}
          color={priceChangeColor}
        />
        <Box mt={['8px', '0']} mr='auto' ml={['0', '15px']}>
          <RangeSelector onChange={onChangeDuration} />
        </Box>
      </Flex>
      <LineChart
        width={props.options.width ?? 900}
        height={props.options.height ?? 400}
        data={chartData}
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
          hide={props.options.hideYAxis ?? true}
        />
        <XAxis
          axisLine={false}
          dataKey='x'
          dy={10}
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
          stroke={theme.colors.icBlue}
          dot={false}
        />
      </LineChart>
    </Flex>
  );
};

export default TokenPriceChart;
