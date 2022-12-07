import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { productTokensBySymbol } from '../../constants/tokens';
// import Dot from '../../components/Dot';
import {
  SetComponent,
  useTokenComponents,
} from '../../hooks/useTokenComponents';
import { colors, pieChartColors } from '../../styles/colors';

import TokenAllocationsChart, { Position } from './TokenAllocationsChart';

const formatPercentOfSetNumber = (percentOfSetNumber: number) =>
  `${percentOfSetNumber.toFixed(1)}%` ?? '';

const TokenAllocations = ({
  tokenSymbol,
}: {
  tokenSymbol: keyof typeof productTokensBySymbol;
}) => {
  const defaultAmountToDisplay = 4;
  const token = productTokensBySymbol[tokenSymbol];
  const { components } = useTokenComponents(token);
  const [amountToDisplay, setAmountToDisplay] = useState<number>(
    defaultAmountToDisplay
  );
  const showAllComponents = () =>
    setAmountToDisplay(components?.length || amountToDisplay);
  const showDefaultComponents = () =>
    setAmountToDisplay(defaultAmountToDisplay);

  const mapSetComponentToPosition = (
    component: SetComponent,
    index: number
  ) => {
    const sliceColor = pieChartColors[index];
    const position: Position = {
      title: component.symbol,
      value: component.percentOfSetNumber,
      percent: formatPercentOfSetNumber(component.percentOfSetNumber),
      color: sliceColor,
      backgroundColor: sliceColor,
    };
    return position;
  };

  const renderTableDisplayControls = () => {
    if (components && components.length > defaultAmountToDisplay)
      return (
        <Box>
          {amountToDisplay < components.length ? (
            <Button
              cursor='pointer'
              size={'xs'}
              background={colors.gray[100]}
              boxShadow='md'
              onClick={showAllComponents}
            >
              Show Complete List
            </Button>
          ) : (
            <Button
              cursor='pointer'
              size={'xs'}
              background={colors.gray[100]}
              boxShadow='md'
              onClick={showDefaultComponents}
            >
              Show Less
            </Button>
          )}
        </Box>
      );
    return null;
  };

  if (components === undefined || components.length === 0) {
    return (
      <Flex w={'100%'} justifyContent={'center'}>
        <Spinner />
      </Flex>
    );
  }

  return (
    // height 612px, width 1152px
    <Flex
      direction={['column', 'column', 'row']}
      alignItems='start'
      justifyContent='space-around'
      w='100%'
      maxWidth={1150}
      padding={['inherit', '45px']}
    >
      <Box margin={['0 auto', '0 auto', '0 64px 0 0']}>
        <Text
          position={'relative'}
          top={165}
          left={125}
          fontSize={'2xl'}
          fontWeight={700}
          fontFamily={'sans-serif'}
          height={0}
        >
          Allocations
        </Text>
        <TokenAllocationsChart
          data={components.map(mapSetComponentToPosition)}
        />
      </Box>
      <Flex
        direction='column'
        alignItems='flex-start'
        mt={['32px', '32px', '0']}
      >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th p={['8px 8px', '8px 8px', '12px 24px']} border='none'>
                Token
              </Th>
              <Th p={['8px 8px', '8px 8px', '12px 24px']} border='none'>
                Allocation
              </Th>
            </Tr>
          </Thead>
          <Tbody
            backgroundColor={colors.gray[50]}
            sx={{
              'tr:first-child td:first-child': {
                borderRadius: '16px 0 0 0',
              },
              'tr:first-child td:last-child': {
                borderRadius: '0 16px 0 0',
              },
              'tr:last-child td:first-child': {
                borderRadius: '0 0 0 16px',
              },
              'tr:last-child td:last-child': {
                borderRadius: '0 0 16px 0',
              },
            }}
          >
            {components?.slice(0, amountToDisplay).map((data) => (
              <ComponentRow key={data.name} component={data} />
            ))}
            <Tr>
              <Td p={['16px 8px', '16px 8px', '16px 24px']} border='none'>
                {renderTableDisplayControls()}
              </Td>
              <Td
                isNumeric
                color={colors.black}
                // TODO?: weight 300 or 700 on hover
                fontWeight={300}
                fontSize='xs'
                p={['16px 8px', '16px 8px', '16px 24px']}
                border='none'
              >
                -
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

/**
 *
 * @param component a SetComponent object to display
 * @returns a component row JSX element
 */
const ComponentRow = (props: { component: SetComponent }) => {
  return (
    <Tr>
      <Td p={['16px 8px', '16px 8px', '16px 24px']} border='none'>
        <Flex alignItems='center'>
          <Image
            borderRadius='full'
            boxSize='30px'
            src={props.component.image}
            alt={props.component.name}
            marginRight='10px'
          />
          {/* TODO? <Dot color={props.component.} /> */}
          <Text fontWeight='500'>{props.component.name}</Text>
        </Flex>
      </Td>
      <Td
        isNumeric
        color={colors.black}
        // TODO: weight 300 or 700 on hover
        fontWeight={300}
        fontSize='xs'
        p={['16px 8px', '16px 8px', '16px 24px']}
        border='none'
      >
        {formatPercentOfSetNumber(props.component.percentOfSetNumber)}
      </Td>
    </Tr>
  );
};

export default TokenAllocations;
