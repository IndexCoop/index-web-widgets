import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { colors } from '../../styles/colors';

const TokenAprsChartTooltip = ({ active, payload, token }: any) => {
  if (active && payload && payload.length) {
    const symbol = token?.symbol.toLowerCase()
    const data = payload[0].payload
    const { x: date, y } = data

    const items = [];
    if (symbol === 'dseth') {
      items.push({ label: 'RETH', value: data.reth, color: colors.icGray3 })
      items.push({ label: 'ETHx', value: data.eeth, color: colors.icBlue4 })
      items.push({ label: 'WSTETH', value: data.wsteth, color: colors.icGray2 })
      items.push({ label: 'swETH', value: data.sweth, color: colors.icBlue5 })
      items.push({ label: 'osETH', value: data.oseth, color: colors.icBlue2 })
      items.push({ label: 'sfrxETH', value: data.sfrxeth, color: colors.icBlue3 })
    } else if (symbol === 'gtceth') {
      items.push({ label: 'dsETH', value: data.dseth, color: colors.icGray4 })
    }
    return (
      <Flex
        background={colors.white}
        boxShadow='md'
        borderRadius='8px'
        direction='column'
        minW='160px'
        p='16px'
      >
        <Flex direction='column'>
          <Flex direction='row' justifyContent='space-between' minWidth={10}>
            <Text
              color={colors.black}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {new Date(date).toLocaleDateString()}
            </Text>
            <Text
              color={colors.black}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {new Date(date).toLocaleTimeString()}
            </Text>
          </Flex>
          <Flex direction='row' justifyContent='space-between' minWidth={10}>
            <Text
              color={colors.icBlue}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {token?.symbol}
            </Text>
            <Text
              color={colors.icBlue}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {`${Number(y).toFixed(2)}%`}
            </Text>
          </Flex>
          {items.map(item => (
            <Flex direction='row' justifyContent='space-between' minWidth={10} key={item.label}>
            <Text
              color={item.color}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {item.label}
            </Text>
            <Text
              color={item.color}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {`${Number(item.value).toFixed(2)}%`}
            </Text>
          </Flex>
          ))}
        </Flex>
      </Flex>
    );
  }

  return null;
};

export default TokenAprsChartTooltip;
