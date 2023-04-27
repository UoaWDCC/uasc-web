//TODO: Ask Bill if it's alg to make a pull request even if I am getting errors with the firebase
// should I make a request even if I haven't completed everything with the backend yet?
import React, { useState } from 'react';
import { auth } from '../firebase';

const SignUpForm = () => {
    const [formState, setFormState] = useState({username: '', email: '', password: '', confirmPassword: '',});

    const handleSubmit = async (event) => { 
        event.preventDefault();
        const {username, email, password, confirmPassword} = formState;
        if(password != confirmPassword){ 
            alert("Passwords do not match");
            return;
        }
        try { 
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await user.updateProfile({displayName: username});
            console.log("User created successfully");
            //TODO: go to the successive page but idk what the next page is 
        } catch (error) {
            console.error("Error creating user:", error);
            //TODO: make a pop up error message to the user
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div> 
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' required /> 
            </div> 
            <div> 
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' required /> 
            </div> 
            <div> 
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' required /> 
            </div> 
            <div> 
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    required
                    />
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default SignUpForm;