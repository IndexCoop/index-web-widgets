import React from 'react';
import { Box } from '@chakra-ui/react';

const Dot = ({
  color,
  diameter = '16px',
}: {
  color: string;
  diameter?: string;
}) => {
  return (
    <Box backgroundColor={color} borderRadius='8px' w={diameter} h={diameter} />
  );
};

export default Dot;
