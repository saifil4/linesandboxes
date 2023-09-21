import React from 'react';
import { Box, Flex, HStack } from '@chakra-ui/react';

const GameCanvas = ({ children }) => {
    return (
        <Flex alignItems="center" justifyContent="center" px="5" py="3">
            {children}
        </Flex>
    )
}

export default GameCanvas