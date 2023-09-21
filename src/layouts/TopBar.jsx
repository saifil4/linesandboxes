import React from 'react';
import { Box, Text, HStack, Progress } from '@chakra-ui/react';
import { BsFillChatFill } from 'react-icons/bs'

const TopBar = ({ players = [], currentPlayer }) => {
    return (
        <Box>
            <HStack justifyContent="center">
                {
                    players.map((player) => (
                        <HStack
                            borderTopWidth="10px"
                            borderTopColor={player.color} p="3"
                            fontWeight={currentPlayer.name === player.name ? 'black': 'normal'}>
                            <Text>
                                {player.name}
                            </Text>
                            <BsFillChatFill />
                        </HStack>
                    ))
                }
            </HStack>
            <Progress value={80} size="sm" colorScheme='green' />
        </Box>
    )
}

export default TopBar;
