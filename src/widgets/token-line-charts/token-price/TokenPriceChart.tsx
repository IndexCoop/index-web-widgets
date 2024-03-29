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
  CategoricalChartState,
  ChartChange,
  ChartOption,
  ChartDatas,
  DurationIndex,
} from '../../../utils/chart';
import {
  getDayOfMonth,
  getFullDayOfWeek,
  getFullMonth,
} from '../../../utils/time';

import TokenPriceChartTooltip from './TokenPriceChartTooltip';

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
  const initialDate = `${getFullDayOfWeek(now)}, ${getFullMonth(
    now
  )} ${getDayOfMonth(now)}`;
  const [date, setDate] = useState<string>(initialDate);
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

      setPrice(
        `${Number(price).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      );

      const diff = Number(initialPrice.replace(/,/g, '')) - price;
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
      setDate(initialDate);
      setPrice(initialPrice);
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
        <Skeleton isLoaded={price !== '0.00'}>
          <Text
            fontSize={['2xl', '3xl', '4xl']}
            margin='0'
            color={colors.black}
          >
            {`$${price}`}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={price !== '0.00'}>
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

const TokenPriceChart = (props: {
  marketData: ChartDatas[];
  currentPrice: string;
  priceChanges: ChartChange[];
  options: ChartOption;
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
    if (props.marketData.length < 1) {
      return;
    }
    const index = durationIndexSelector;
    const chartData = props.marketData[index];
    setChartData(chartData);
  }, [durationIndexSelector, props.marketData]);

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
      duration: DurationIndex
    ): Intl.DateTimeFormatOptions => {
      switch (duration) {
        case DurationIndex.DAILY:
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

    var options = dateFormatterOptions(durationIndexSelector);
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

  const priceChange = props.priceChanges[durationIndexSelector];
  const priceChangeColor = priceChange.isPositive
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
          <XAxis
            dataKey='x'
            axisLine={false}
            interval='preserveStart'
            minTickGap={100}
            stroke={strokeColor}
            tickFormatter={xAxisTickFormatter}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            domain={yAxisDomain}
            stroke={strokeColor}
            tickFormatter={yAxisTickFormatter}
            tickLine={false}
            hide={displayYAxis}
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
