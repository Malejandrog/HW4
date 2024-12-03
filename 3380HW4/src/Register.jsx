import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Text, Link as ChakraLink } from '@chakra-ui/react'; // Import Chakra UI components
import './Register.css';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasloyaltycard, setHasLoyaltyCard] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://172.25.48.31:5000/create-account', {
        name: name,
        address: address,
        city: city,
        state: state,
        phone: phone,
        email: email,
        password: password,
        hasloyaltycard: hasloyaltycard === "true"
      });
  
      if (response.data.success) {
        console.log('User Created:', response.data.message);
        navigate('/Order'); // Use navigate to redirect to /Order
      } else {
        setError('Invalid details. Please try again.');
      }
    } catch (err) {
      console.error('Error during user creation:', err);
      setError('An error occurred during user creation. Please try again.');
    }
  };

  return (
    <>
      <div className='registerForm'>
        <h1>Create an Account</h1>

        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="hasloyaltycard">Loyalty Card:</label>
        <select
          name="hasloyaltycard"
          id="hasloyaltycard"
          value={hasloyaltycard}
          onChange={(e) => setHasLoyaltyCard(e.target.value)}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>



        <button className="registerButton" onClick={handleSubmit}>Sign Up</button>

        <Text>
          or{' '}
          <ChakraLink as={RouterLink} to="/" color="blue.500">
            Sign In
          </ChakraLink>
        </Text>
      </div>
    </>
  );
};

export default Register;
