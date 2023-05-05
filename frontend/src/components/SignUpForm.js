import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Update the import path if necessary
import { addDoc, collection } from '@firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = formState;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await user.updateProfile({ displayName: username });
      console.log('User created successfully');
  
      // Adding user data to the collection in the Firebase
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        username,
        email,
      });
  
      navigate('/success'); // Replace '/success' with the URL of the next page, e.g., the home page
    } catch (error) {
      console.error('Error creating user:', error);
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const textFieldStyle = {
    marginBottom: '16px',
    width: '100%',
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div style={textFieldStyle}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          required
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div style={textFieldStyle}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          required
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div style={textFieldStyle}>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          required
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div style={textFieldStyle}>
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          required
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default SignUpForm;
