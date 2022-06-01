import React, { useContext } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Box, Flex } from '@chakra-ui/react';
import { TrainingContext } from '../context/TrainingContext';
import { TrashIcon } from '@primer/octicons-react';

function TrainingHistory(handleDelete, id) {
    const { trainingData } = useContext(TrainingContext);
    return (
        <Flex width="full" align="center" justifyContent="center" paddingTop="60px" mr="5px" ml="5px">
            <Box padding={8} maxWidth="1800px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Training name</Th>
                                    <Th>Date</Th>
                                    <Th>Lifted Weight</Th>
                                    <Th>Burned calories</Th>
                                    <Th>Exercises done during training</Th>
                                    <Th>Training duration</Th>
                                    <Th>Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {trainingData.map((t) => {
                                    const date = t.date.toDate();
                                    return (
                                        <Tr key={t.id}>
                                            <Td>{`${t.trainingName}`}</Td>
                                            <Td>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</Td>
                                            <Td>{`${t.liftedWeight}`}</Td>
                                            <Td>{`${t.burnedcalories}`}</Td>
                                            <Td>{`${t.exercisesIntraining}`}</Td>
                                            <Td>{`${t.trainingDuration}`}</Td>
                                            <Td>
                                                <IconButton
                                                    aria-label="Delete"
                                                    icon={<TrashIcon />}
                                                    className="item-delete-btn"
                                                    onClick={() => handleDelete(id)}
                                                >
                                                    Delete
                                                </IconButton>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            </Box>
        </Flex>
    );
}

export default TrainingHistory;
