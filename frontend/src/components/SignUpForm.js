import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
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
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = formState;

    // Validate form input
    const newErrors = {
      username: !username,
      email: !email,
      password: !password,
      confirmPassword: confirmPassword !== password,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
      // Update the user's display name
      await updateProfile(user, { displayName: username });

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
          name="username"
          label="Username"
          variant="outlined"
          required
          onChange={handleChange}
          error={errors.username}
          helperText={errors.username ? 'Username is required' : ''}
          style={{ width: '100%' }}
        />
      </div>
      <div style={textFieldStyle}>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          required
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? 'Email is required' : ''}
          style={{ width: '100%' }}
        />
      </div>
      <div style={textFieldStyle}>
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          required
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password ? 'Password is required' : ''}
          style={{ width: '100%' }}
        />
      </div>
      <div style={textFieldStyle}>
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          required
          onChange={handleChange}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword ? 'Passwords do not match' : ''}
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
