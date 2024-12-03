import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { Text, Link as ChakraLink } from '@chakra-ui/react'; // Import Chakra UI components
import './Login.css';
import axios from 'axios'; // Import Axios for API calls

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling errors
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the /api/login endpoint
      const response = await axios.post('http://172.25.48.31:5000/login-function', {
        email: email,
        password: password,
      });

      // Handle successful login
      if (response.data.success) {
        console.log('Login successful:', response.data.message);
        navigate('/Order'); // Use navigate to redirect to /Order
      } else {
        // Handle login failure
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred during login. Please try again later.');
    }
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

        {error && <p className="error">{error}</p>} {/* Display error messages */}

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
            to Order Form
          </ChakraLink>
        </Text>
      </div>
    </>
  );
};

export default Login;
