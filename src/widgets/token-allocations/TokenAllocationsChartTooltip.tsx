import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import Dot from '../../components/Dot';
import { colors } from '../../styles/colors';

const DataRow = ({
  title,
  value,
  textColor,
}: {
  title: string;
  value: string;
  textColor: string;
}) => {
  return (
    <Flex direction='column'>
      <Text color={textColor} fontSize='12px' fontWeight='500' margin='0'>
        {title}
      </Text>
      <Text color={textColor} fontSize='16px' fontWeight='500' margin='0'>
        {value}
      </Text>
    </Flex>
  );
};

const TokenAllocationsChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { backgroundColor, title, percent } = payload[0].payload;
    return (
      <Flex
        background={colors.white}
        boxShadow='md'
        borderRadius='8px'
        direction='column'
        minW='160px'
        p='16px'
      >
        <Flex align='center' justify='space-between'>
          <Text
            color={colors.black}
            fontSize='16px'
            fontWeight='700'
            margin='0'
          >
            {title}
          </Text>
          <Dot color={backgroundColor} />
        </Flex>
        <Box my='8px'>
          <DataRow
            title='Allocation'
            value={percent}
            textColor={colors.black}
          />
        </Box>
      </Flex>
    );
  }

  return null;
};

export default TokenAllocationsChartTooltip;
