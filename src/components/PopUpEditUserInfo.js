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
    FormErrorMessage,
    Radio, RadioGroup, 
    Box, 
    IconButton
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {  PencilIcon } from '@primer/octicons-react';

import { collection, getDocs, where, query, updateDoc } from 'firebase/firestore';
import database from '../FirebaseConfig';


export const handleUpdateDataF = async (data, email) => {
    try {
        const first = query(collection(database, 'users'), where('email', '==', email));
        const queryRef = await getDocs(first)
        queryRef.forEach((doc) => {
             updateDoc(doc, { ...data });
        });
      
      
      console.log('Document updated.');
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

function PopUpEditUserInfo({userData}) {
    const auth = getAuth();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState(userData.name);
    const [surname, setSurname] = useState(userData.surname);
    const [username, setUsername] = useState(userData.username);
    

    const [gender, setGender] = React.useState(userData.gender);
    const [age, setAge] = useState(userData.age);
    const [height, setHeight] = useState(userData.height);
    const [userWeight, setUserWeight] = useState(userData.userWeight);
    

    const handleEditUserInfo = (event) => {
        event.preventDefault();
        const data = {name: name, surname: surname, username: username, gender: gender, age: age, height: height, weight: userWeight, email: auth.currentUser.email}
        handleUpdateDataF(data, auth.currentUser.email)
        
        onClose();
        
    };

    console.log(userData);
    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <>
                <Box onClick={onOpen} colorScheme="teal">
                <IconButton
                                aria-label="Edit user data"
                                icon={<PencilIcon />}
                                className="item-edit-btn"
                                /* onClick={() => handleEdit(id)} */
                                mb="5px"
                            >
                                Edit user data
                            </IconButton>
                </Box>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit user info</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack direction={['column']} spacing={1}>
                                <form onSubmit={handleEditUserInfo} id="edituserinfo">
                                <FormControl isRequired isInvalid={name === ''}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="name"
                                    size="lg"
                                    defaultValue={name}
                                    onChange={(event) => setName(event.currentTarget.value.replace(/[^a-z]/gi, ''))}
                                />
                                {name === '' ? <FormErrorMessage>Name is required.</FormErrorMessage> : ''}
                            </FormControl>
                            <FormControl isRequired isInvalid="Enter data into field">
                                <FormLabel>Surname</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="surname"
                                    size="lg"
                                    defaultValue={surname}
                                    onChange={(event) => setSurname(event.currentTarget.value.replace(/[^a-z]/gi, ''))}
                                />
                                {surname === '' ? <FormErrorMessage>Surame is required.</FormErrorMessage> : ''}
                            </FormControl>
                            <FormControl isRequired isInvalid={username === ''}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="username"
                                    size="lg"
                                    defaultValue={username}
                                    onChange={(event) => setUsername(event.currentTarget.value)}
                                />
                                {username === '' ? <FormErrorMessage>Username is required.</FormErrorMessage> : ''}
                            </FormControl>
                          
                            <FormControl isRequired mt={6} isInvalid={gender === ''}>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup onChange={setGender} value={gender}>
                                    <Stack direction="column">
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl isRequired isInvalid={age === ''}>
                                <FormLabel>Age</FormLabel>
                                <NumberInput min="1">
                                    <NumberInputField
                                        type="number"
                                        placeholder="age"
                                        size="lg"
                                        defaultValue={age}
                                        onChange={(event) => setAge(Math.abs(Math.trunc(event.currentTarget.value)))}
                                    />
                                    {age === '' ? <FormErrorMessage>Age is required.</FormErrorMessage> : ''}
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl isRequired isInvalid={height === ''}>
                                <FormLabel>Height - in centimeters</FormLabel>
                                <NumberInput min="1">
                                    <NumberInputField
                                        type="number"
                                        placeholder="height"
                                        size="lg"
                                        defaultValue={height}
                                        onChange={(event) => setHeight(Math.abs(Math.trunc(event.currentTarget.value)))}
                                    />
                                    {height === '' ? <FormErrorMessage>Height is required.</FormErrorMessage> : ''}
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl isRequired isInvalid={userWeight === ''}>
                                <FormLabel>Weight - in kilos</FormLabel>
                                <NumberInput min="1">
                                    <NumberInputField
                                        type="number"
                                        placeholder="user weight"
                                        size="lg"
                                        defaultValue={userWeight}
                                        onChange={(event) => setUserWeight(Math.abs(Math.trunc(event.currentTarget.value)))}
                                    />
                                    {userWeight === '' ? <FormErrorMessage>User weight is required.</FormErrorMessage> : ''}
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                           
                                </form>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="teal" onClick={handleEditUserInfo} type="submit" form="edituserinfo">
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
export default PopUpEditUserInfo;