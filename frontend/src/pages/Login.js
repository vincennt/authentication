import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'

import {
  Text,
  Center,
  Grid,
  GridItem,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Button
} from '@chakra-ui/react'

import { SunIcon, LockIcon } from '@chakra-ui/icons'

const Login = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: values => {
      (async () => {
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(values)
        })
          const data = await response.json()
          if(data.status >= 400){
            alert(data.statusText)
          }
          else {
            navigate('/admin')
          }
          })
      
      ()},
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required"),
      password: Yup.string()
        .required("Password is required")
    })
  })

  return (
    <Grid templateColumns='repeat(2, 1fr)' h='100vh'>
      <GridItem>
        <Center h='100%' paddingLeft='50px' paddingRight='50px'>
          <form onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SunIcon color='gray.300' />}
                />
                <Input
                  type='text'
                  name='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl mt={5} isInvalid={formik.errors.password}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.300' />}
                />
                <Input
                  type='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <Button mt={5} w='100%' type='submit' color='white' bg='salmon'>Login</Button>
            <Link to="/signup">
              <Text mt={5} as="p" color="blue.500">
                Already have an account ? Login!
              </Text>
            </Link>
          </form>
        </Center>
      </GridItem>
      <GridItem bg="gray.800">
        <Center h='100%'>
          <Text color="white" as="h1" fontWeight={800} fontSize={'54px'}>Login</Text>
        </Center>
      </GridItem>
    </Grid>
  )
}

export default Login