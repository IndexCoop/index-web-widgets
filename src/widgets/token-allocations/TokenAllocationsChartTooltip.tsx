import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

// import { colors, useICColorMode } from 'styles/colors'
import Dot from '../../components/Dot';

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
      <Text color={textColor} fontSize='12px' fontWeight='500'>
        {title}
      </Text>
      <Text color={textColor} fontSize='16px' fontWeight='500'>
        {value}
      </Text>
    </Flex>
  );
};

const TokenAllocationsChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const tooltipBgColor = '#EEE'; // FIXME WIP
    // const tooltipBgColor = "#FFF"
    const textColor = '#000';

    const { backgroundColor, title, percent } = payload[0].payload;
    return (
      <Flex
        background={tooltipBgColor}
        borderRadius='8px'
        direction='column'
        minW='160px'
        p='16px'
      >
        <Flex align='center' justify='space-between'>
          <Text color={textColor} fontSize='16px' fontWeight='700'>
            {title}
          </Text>
          <Dot color={backgroundColor} />
        </Flex>
        <Box my='8px'>
          <DataRow title='Allocation' value={percent} textColor={textColor} />
        </Box>
      </Flex>
    );
  }

  return null;
};

export default TokenAllocationsChartTooltip;
