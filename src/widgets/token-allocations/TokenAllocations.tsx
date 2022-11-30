import React, { useState } from "react";
import { Box, Flex, Image, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

// import { pieChartColors } from 'styles/colors'

import { productTokensBySymbol } from "../../constants/tokens";
import { SetComponent, useTokenComponents } from "../../hooks/useTokenComponents";

import TokenAllocationsChart, { Position } from "./TokenAllocationsChart";

const TokenComponentsTable = ({ tokenSymbol }: { tokenSymbol: keyof typeof productTokensBySymbol }) => {
  const defaultAmountToDisplay = 4
  const token = productTokensBySymbol[tokenSymbol]
  const { components } = useTokenComponents(token);
  const [amountToDisplay, setAmountToDisplay] = useState<number>(defaultAmountToDisplay);
  const showAllComponents = () => setAmountToDisplay(components?.length || amountToDisplay);
  const showDefaultComponents = () => setAmountToDisplay(defaultAmountToDisplay);

  const mapSetComponentToPosition = (component: SetComponent, index: number) => {
    // const sliceColor = pieChartColors[index]
    const position: Position = {
      title: component.symbol,
      value: component.percentOfSetNumber,
      percent: `${component.percentOfSetNumber.toFixed(1)}%` ?? "",
      // color: sliceColor,
      // backgroundColor: sliceColor,
    };
    return position;
  };

  const renderTableDisplayControls = () => {
    if (components && components.length > defaultAmountToDisplay)
      return (
        <Box my="20px">
          {amountToDisplay < components.length ? (
            <Text cursor="pointer" onClick={showAllComponents}>
              Show Complete List
            </Text>
          ) : (
            <Text cursor="pointer" onClick={showDefaultComponents}>
              Show Less
            </Text>
          )}
        </Box>
      );
    return null;
  };

  if (components === undefined || components.length === 0) {
    return (
      <Flex w={"100%"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex direction={["column", "column", "row"]} alignItems="start">
      <Box margin={["0 auto", "0 auto", "0 64px 0 0"]}>
        <TokenAllocationsChart data={components.map(mapSetComponentToPosition)} />
      </Box>
      <Flex direction="column" alignItems="center" mt={["32px", "32px", "0"]}>
        <Table variant="simple">
          <Thead>
            <Tr borderBottom="1px">
              <Th p={["8px 8px", "8px 8px", "12px 24px"]}>Token</Th>
              <Th isNumeric p={["8px 8px", "8px 8px", "12px 24px"]}>
                Allocation
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {components?.slice(0, amountToDisplay).map(data => (
              <ComponentRow key={data.name} component={data} />
            ))}
          </Tbody>
        </Table>
        {renderTableDisplayControls()}
      </Flex>
    </Flex>
  );
};

/**
 *
 * @param component a SetComponent object to display
 * @returns a component row JSX element
 */
const ComponentRow = (props: { component: SetComponent; disablePercentage?: boolean }) => {
  return (
    <Tr borderBottom="1px">
      <Td p={["16px 8px", "16px 8px", "16px 24px"]}>
        <Flex alignItems="center">
          <Image
            borderRadius="full"
            boxSize="30px"
            src={props.component.image}
            alt={props.component.name}
            marginRight="10px"
          />
          <Text fontWeight="500">{props.component.name}</Text>
        </Flex>
      </Td>
      <Td
        isNumeric
        // color={black}
        p={["16px 8px", "16px 8px", "16px 24px"]}
      >
        {props.component.percentOfSet}
      </Td>
    </Tr>
  );
};

export default TokenComponentsTable;
