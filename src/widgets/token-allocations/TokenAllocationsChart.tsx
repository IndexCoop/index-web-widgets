import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import TokenAllocationsChartTooltip from './TokenAllocationsChartTooltip';

export interface Position {
  title: string;
  backgroundColor: string;
  color: string;
  value: number;
  percent: string;
}

const TokenAllocationsChart = (props: { data: Position[] }) => {
  return (
    <PieChart width={375} height={375}>
      <Pie
        data={props.data}
        dataKey='value'
        cx='50%'
        cy='50%'
        innerRadius={120}
        outerRadius={160}
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
      <Tooltip
        content={<TokenAllocationsChartTooltip />}
        position={{ x: 300, y: -15 }}
      />
    </PieChart>
  );
};

export default TokenAllocationsChart;
