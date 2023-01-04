import { useForm } from 'react-hook-form';
import axios from 'axios';

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
  Box,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
var _ = require('lodash');
export default function AddDetails() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

   async function onSubmit(values) {
     try {
       const response = await fetch("http://localhost:3001/savePlayerDetails", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(values)
       })
       const data= await  response.json();
       if(_.isEmpty(data.rows)){
         throw "error";
       }
       const playerId = data.rows[0].player_id;
       console.log(JSON.stringify(data))
     setToastMessage({
       title: `Player: ${playerId} on-boarded successfully`,
       status:'success'
     })

     } catch (err) {
       setToastMessage({
         title: `Invalid player details`,
         status:'error'
       })
     }
  }

  const [toastMessage, setToastMessage] = useState(undefined);
  const toast = useToast();

  useEffect(() => {
    if (toastMessage) {
      const { title, body ,status} = toastMessage;

      toast({
        title,
        description: body,
        status: status,
        duration: 2000,
        isClosable: true
      });
    }
  }, [toastMessage, toast]);

  return (
    <>
      <Heading padding={16}>Player Form</Heading>
      <Box padding={16}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input
              id='name'
              placeholder='Player Name'
              {...register('player_name', {
                required: 'This is required',
                minLength: { value: 2, message: 'Minimum length should be 2' },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <br />
          <FormControl isInvalid={errors.battingHand}>
            <FormLabel htmlFor='batting_hand'>Batting_Hand</FormLabel>
            <Input
              id='battingHand'
              placeholder='Batting Hand'
              {...register('batting_hand', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <FormErrorMessage>
              {errors.battingHand && errors.battingHand.message}
            </FormErrorMessage>
          </FormControl>
          <br />
          <FormControl isInvalid={errors.dob}>
            <FormLabel htmlFor='dob'>DOB</FormLabel>
            <Input
              id='dob'
              placeholder='DOB'
              {...register('dob', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />


            <FormErrorMessage>
              {errors.dob && errors.dob.message}
            </FormErrorMessage>
          </FormControl>
          <br />
          <FormControl isInvalid={errors.bowlingSkill}>
            <FormLabel htmlFor='bowlingSkill'>Bowling Skill</FormLabel>
            <Input
              id='bowling_skill'
              placeholder='Bowling Skill'
              {...register('bowling_skill', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />


            <FormErrorMessage>
              {errors.bowlingSkill && errors.bowlingSkill.message}
            </FormErrorMessage>
          </FormControl>
          <br />
          <FormControl isInvalid={errors.country}>
            <FormLabel htmlFor='country'>Country</FormLabel>
            <Input
              id='country'
              placeholder='Country'
              {...register('country', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />


            <FormErrorMessage>
              {errors.country && errors.country.message}
            </FormErrorMessage>
          </FormControl>
          <br />

          <Button
            mt={4}
            colorScheme='teal'
            isLoading={isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}
