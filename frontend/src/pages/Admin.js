import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Grid, GridItem, Text, Container, Button } from '@chakra-ui/react'

const Admin = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/admin', {
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          navigate('/login')
        } else {
          setUsers(data)
        }
      })
  }, [])

  const handleLogoutClick = () => {
    fetch('http://localhost:5000/auth/logout', {
      method: 'delete',
      credentials: 'include'
    })
      .then(response => {
        navigate('/login')
      })
  }

  return (
    <Container>
      <Text as="h1" fontWeight={800} fontSize={'54px'} pb={5}>Admin</Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={5}>
        {users.map(user => (
          <GridItem key={user.username} p={3} border='1px' borderColor='gray.400' borderRadius={5}>
            <img src={user.profilePicture} />
            <Text as='h2' fontSize={30} fontWeight={500}>{user.username}</Text>
            <Text as='p'>{user.email}</Text>
            <Text as='p'>{user.age}</Text>
          </GridItem>
        ))}
      </Grid>

      <Button
        mt={5}
        bg='salmon'
        color='white'
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </Container>
  )
}

export default Admin