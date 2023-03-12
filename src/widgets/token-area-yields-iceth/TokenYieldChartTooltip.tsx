import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { colors } from '../../styles/colors';

const TokenYieldChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { x: date, y: apy1, y2: apy2 } = payload[0].payload;
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
              {'Net Yield vs ETH:'}
            </Text>
            <Text
              color={colors.icBlue}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {`${Number(apy1).toFixed(2)}%`}
            </Text>
          </Flex>
          <Flex direction='row' justifyContent='space-between' minWidth={10}>
            <Text
              color={colors.icBlue2}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {'Net Yield vs stETH:'}
            </Text>
            <Text
              color={colors.icBlue2}
              fontSize='12px'
              fontWeight='500'
              margin='0'
            >
              {`${Number(apy2).toFixed(2)}%`}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return null;
};

export default TokenYieldChartTooltip;
