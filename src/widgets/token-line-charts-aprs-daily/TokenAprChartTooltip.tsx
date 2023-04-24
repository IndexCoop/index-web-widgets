import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { colors } from '../../styles/colors';

const TokenAprChartTooltip = ({ active, payload, token }: any) => {
  if (active && payload && payload.length) {
    const { x: day, y } = payload[0].payload;
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
              {new Date(day).toLocaleDateString()}
            </Text>
            <Text
              color={colors.black}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {new Date(day).toLocaleTimeString()}
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
        </Flex>
      </Flex>
    );
  }

  return null;
};

export default TokenAprChartTooltip;
