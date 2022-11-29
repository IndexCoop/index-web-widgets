import React from "react";
import {
    Cell,
    Pie,
    PieChart,
    Tooltip,
} from 'recharts'

import TokenAllocationsChartTooltip from './TokenAllocationsChartTooltip'

export interface Position {
    title: string
    // backgroundColor: string
    // color: string
    value: number
    valueDisplay?: string
    percent?: string
}

const TokenAllocationsChart = (props: {
    data: Position[]
}) => {
    return (
        <PieChart width={300} height={300}>
            <Pie
                data={props.data}
                dataKey='value'
                cx='50%'
                cy='50%'
                innerRadius={80}
                outerRadius={140}
                startAngle={90}
                endAngle={-360}
                legendType='line'
            >
                {props.data.map((item, index) => (
                    <Cell
                        key={`cell-${index}`}
                    // fill={item.backgroundColor}
                    // fill="#000"
                    // stroke={item.color}
                    // stroke="#000"

                    />
                ))}
            </Pie>
            <Tooltip content={<TokenAllocationsChartTooltip />} position={{ x: 150, y: -25 }} />
        </PieChart>
    )
}




export default TokenAllocationsChart
