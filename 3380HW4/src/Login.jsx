import React, { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Text, Link as ChakraLink } from '@chakra-ui/react'; // Import Chakra UI components
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <>
      <div className='loginForm'>
        <h1>Login</h1>

        
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="loginButton" onClick={handleSubmit}>Log In</button>

        <Text>
          or{' '}
          <ChakraLink as={RouterLink} to="/register" color="blue.500">
            Create an Account
          </ChakraLink>
        </Text>

        <Text>
          or{' '}
          <ChakraLink as={RouterLink} to="/Order" color="blue.500">
            to Order Fourm
          </ChakraLink>
        </Text>
      </div>
    </>
  );
};

export default Login;
