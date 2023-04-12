import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import TokenAllocationsChartTooltip from './TokenAllocationsChartTooltip';

export interface Position {
  title: string;
  backgroundColor: string;
  color: string;
  value: number;
  percent: string;
}

const chartSmall = {
  diameter: 290,
  innerRadius: 105,
  outerRadius: 135,
};
const chartLarge = {
  diameter: 375,
  innerRadius: 120,
  outerRadius: 160,
};

const TokenAllocationsChart = (props: { data: Position[] }) => {
  const [isLargerThan400, isLargerThan625] = useMediaQuery([
    '(min-width: 400px)',
    '(min-width: 625px)',
  ]);
  const chartSize = isLargerThan400 ? chartLarge : chartSmall;
  const position = isLargerThan625
    ? { x: 300, y: 0 }
    : isLargerThan400
    ? { x: 200, y: 0 }
    : { x: 100, y: 0 };

  return (
    <PieChart width={chartSize.diameter} height={chartSize.diameter}>
      <Pie
        data={props.data}
        dataKey='value'
        cx='50%'
        cy='50%'
        innerRadius={chartSize.innerRadius}
        outerRadius={chartSize.outerRadius}
        startAngle={90}
        endAngle={-360}
        legendType='none'
      >
        {props.data.map((item, index) => (
          <Cell
            key={`cell-${index}`}
            fill={item.backgroundColor}
            stroke={item.color}
          />
        ))}
      </Pie>
      <Tooltip content={<TokenAllocationsChartTooltip />} position={position} />
    </PieChart>
  );
};

export default TokenAllocationsChart;
