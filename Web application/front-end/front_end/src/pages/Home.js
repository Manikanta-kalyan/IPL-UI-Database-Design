import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [playerDetails, setPlayerDetails] = useState([]);
  /* useEffect(() => {
     axios.get(`http://localhost:6000/getProviderDetails`)
       .then(res => {
         console.log("hey")
         console.log(res);
         setProviderDetails(res.data)
       })
   }, []);*/


  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/getPlayerDetails');
      const jsonData = await response.json();
      console.log(jsonData);
      setPlayerDetails(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);


  return (
    <>
      <Heading padding={16}>Player Details</Heading>
      <TableContainer padding={16}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Player ID</Th>
              <Th>Player Name</Th>
              <Th>DOB</Th>
              <Th>Batting Hand</Th>
              <Th>Bowling Skill</Th>
              <Th>Country</Th>
              {/*<Th>Primary Category</Th>*/}
              {/*<Th>Primary Hub ID</Th>*/}

            </Tr>
          </Thead>
          <Tbody>
            {playerDetails?.map(detail => (
              <Tr>
                <Td>{detail.player_id}</Td>
                <Td>{detail.player_name}</Td>
                <Td>{detail.dob}</Td>
                <Td>{detail.batting_hand}</Td>
                <Td>{detail.bowling_skill}</Td>
                <Td>{detail.country}</Td>
                {/*<Td>{detail.primary_category}</Td>*/}
                {/*<Td>{detail.primary_hub_id}</Td>*/}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
