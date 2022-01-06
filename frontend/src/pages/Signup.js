import { useState } from 'react'
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

import { SunIcon, LockIcon, EmailIcon, MoonIcon, ViewIcon } from '@chakra-ui/icons'

const Signup = () => {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(true)

  const formik = useFormik({
    initialValues: {
      username: "bobby",
      password: "bobbybobby",
      passwordConfirmation: "bobbybobby",
      email: "bobby@bobby.bobby",
      age: "2"
    },
    onSubmit: values => {
      // on va créer notre utilisateur dans le backend    
      fetch('http://localhost:5000/auth/signup', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          age: values.age,
          email: values.email,
          password: values.password,
          username: values.username
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.error) {
            alert(user.error)
          } else {
            const formdata = new FormData()
            formdata.append('profilePicture', values.file, values.file.name)

            fetch(`http://localhost:5000/users/${user.id}`, {
              method: 'post',
              credentials: 'include',
              body: formdata
            })
              .then(response => response.json())
              .then(data => {
                // // si tout va bien, on récupère les infos de l'utilisateur
                // qu'on vient de créer. On va donc pouvoir utiliser son username
                // et son password pour se connecter
                fetch('http://localhost:5000/auth/login', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                    username: user.username,
                    password: user.password
                  })
                })
                  .then(response => response.json())
                  .then(data => {
                    navigate('/admin')
                  })
              })
          }
        })
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password is too short"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      email: Yup.string()
        .required("Email is required")
        .email("Email invalid"),
      age: Yup.string()
        .required("Age is required")
    })
  })

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleFileChange = e => {
    formik.setFieldValue('file', e.target.files[0])
  }

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
              <FormLabel htmlFor='password'>
                Password
                <ViewIcon
                  color='gray.300'
                  onClick={togglePasswordVisible}
                />
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.300' />}
                />
                <Input
                  type={passwordVisible ? 'text' : 'password'}
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl mt={5} isInvalid={formik.errors.passwordConfirmation}>
              <FormLabel htmlFor='passwordConfirmation'>Password confirmation</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.300' />}
                />
                <Input
                  type='password'
                  name='passwordConfirmation'
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.passwordConfirmation}</FormErrorMessage>
            </FormControl>

            <FormControl mt={5} isInvalid={formik.errors.email}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<EmailIcon color='gray.300' />}
                />
                <Input
                  type='text'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl mt={5} isInvalid={formik.errors.age}>
              <FormLabel htmlFor='age'>Age</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<MoonIcon color='gray.300' />}
                />
                <Input
                  type='number'
                  name='age'
                  value={formik.values.age}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.age}</FormErrorMessage>
            </FormControl>

            <FormControl mt={5} isInvalid={formik.errors.age}>
              <FormLabel htmlFor='age'>Photo de profile</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<MoonIcon color='gray.300' />}
                />
                <Input
                  type='file'
                  name='file'
                  onChange={handleFileChange}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.age}</FormErrorMessage>
            </FormControl>

            <Button mt={5} w='100%' type='submit' color='white' bg='salmon'>Signup</Button>

            <Link to="/login">
              <Text mt={5} as="p" color="blue.500">
                You don't have an account ? Signup!
              </Text>
            </Link>
          </form>
        </Center>
      </GridItem>
      <GridItem bg="gray.800">
        <Center h='100%'>
          <Text color="white" as="h1" fontWeight={800} fontSize={'54px'}>Signup</Text>
        </Center>
      </GridItem>
    </Grid>
  )
}

export default Signup