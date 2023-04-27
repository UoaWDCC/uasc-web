import React from 'react';

const SignUpForm = () => { 
    const handleSubmit = (event) => { 
        event.preventDefault();
        console.log('Form Submitted');
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