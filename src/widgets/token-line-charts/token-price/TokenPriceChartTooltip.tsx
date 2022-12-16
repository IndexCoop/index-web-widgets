import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { colors } from '../../../styles/colors';

const TokenPriceChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { x: date, y: price } = payload[0].payload;
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
            <Text color={colors.black} fontSize='12px' fontWeight='500'>
              {new Date(date).toLocaleDateString()}
            </Text>
            <Text color={colors.black} fontSize='12px' fontWeight='500'>
              {new Date(date).toLocaleTimeString()}
            </Text>
          </Flex>
          <Text
            color={payload[0]?.stroke ?? colors.black}
            fontSize='16px'
            fontWeight='500'
          >
            {`$${Number(price).toFixed(2)}`}
          </Text>
        </Flex>
      </Flex>
    );
  }

  return null;
};

export default TokenPriceChartTooltip;
