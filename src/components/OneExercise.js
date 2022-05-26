import React from 'react';
import { IconButton, Grid, GridItem, ListItem, Divider, Stack, Box } from '@chakra-ui/react';
import { TrashIcon, PencilIcon } from '@primer/octicons-react';
import './OneExercise.css';

function OneExercise({ exercisename, weight, reps, handleDelete, id, handleEdit }) {
    return (
        <>
            <ListItem>
                <Grid templateColumns="repeat(5, 1fr)" gap={6} className="item" bg="teal">
                    <GridItem w="100%" h="30px">
                        <p>Exercise name</p>
                        <Divider orientation="horizontal" />
                        <h3>{exercisename}</h3>
                    </GridItem>
                    <GridItem w="100%">
                        <p>Weight in kilos</p>
                        <Divider orientation="horizontal" />
                        <h3>{weight}</h3>
                    </GridItem>
                    <GridItem w="100%">
                        <p>Number of reps</p>
                        <Divider orientation="horizontal" />
                        <h3>{reps}</h3>
                    </GridItem>

                    <GridItem w="20%">
                        <Stack direction={['column', 'row']} spacing="18px">
                            <Box>
                                <p>Edit</p>
                                <IconButton
                                    aria-label="Edit"
                                    icon={<PencilIcon />}
                                    className="item-edit-btn"
                                    onClick={() => handleEdit(id)}
                                >
                                    Edit
                                </IconButton>
                            </Box>
                            <Box>
                                <p>Delete</p>

                                <IconButton
                                    aria-label="Delete"
                                    icon={<TrashIcon />}
                                    className="item-delete-btn"
                                    onClick={() => handleDelete(id)}
                                >
                                    Delete
                                </IconButton>
                            </Box>
                        </Stack>
                    </GridItem>
                </Grid>
            </ListItem>
            <Divider orientation="horizontal" />
        </>
    );
}

export default OneExercise;
