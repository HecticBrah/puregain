import React, { useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormLabel,
    Input,
    Stack,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberDecrementStepper,
    FormControl,
    IconButton,
    InputGroup,
} from '@chakra-ui/react';

import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PencilIcon } from '@primer/octicons-react';

function PopUpEditExercise({ handleEditExercise, exercise, editIndex }) {
    const auth = getAuth();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [exerciseName, setexerciseName] = useState(exercise.exerciseName);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);

    const handleEditExerciseMain = (event) => {
        event.preventDefault();
        const newData = { exerciseName: exerciseName, id: exercise.id, reps: reps, weight: weight };

        handleEditExercise(editIndex, newData);
        onClose();
    };

    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <>
                <IconButton aria-label="Edit exercise" icon={<PencilIcon />} className="item-edit-btn" mb="5px" onClick={onOpen}>
                    Edit user data
                </IconButton>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit exercise</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack direction={['column']} spacing={1}>
                                <form onSubmit={handleEditExerciseMain} id="edituserinfo">
                                    <FormControl isRequired isInvalid={exerciseName === ''}>
                                        <FormLabel>Exercise name</FormLabel>
                                        <Input
                                            style={{ height: '48px' }}
                                            type="text"
                                            placeholder="exercise-name"
                                            size="lg"
                                            value={exerciseName}
                                            onChange={(event) => setexerciseName(event.currentTarget.value)}
                                        />
                                    </FormControl>
                                    <FormControl isRequired isInvalid={weight === ''}>
                                        <FormLabel>Weight </FormLabel>
                                        <InputGroup step={1} min={1}>
                                            <NumberInput defaultValue={weight}>
                                                <NumberInputField
                                                    style={{ height: '48px' }}
                                                    type="number"
                                                    placeholder="weight"
                                                    size="lg"
                                                    min="1"
                                                    onChange={(event) => setWeight(Math.abs(Math.trunc(event.currentTarget.value)))}
                                                />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl isRequired isInvalid={reps === ''}>
                                        <FormLabel>Reps </FormLabel>
                                        <InputGroup step={1} min={1}>
                                            <NumberInput defaultValue={reps}>
                                                <NumberInputField
                                                    style={{ height: '48px' }}
                                                    type="number"
                                                    placeholder="reps"
                                                    size="lg"
                                                    min="1"
                                                    onChange={(event) => setReps(Math.abs(Math.trunc(event.currentTarget.value)))}
                                                />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </InputGroup>
                                    </FormControl>
                                </form>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="teal" type="submit" form="edituserinfo">
                                Confirm
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    }
}
export default PopUpEditExercise;
