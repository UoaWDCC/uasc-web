import React, { useState } from "react";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // The user is successfully signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel style={{ "textAlign": "left" }}>Email</FormLabel>
                <TextField id="email" onChange={e => setEmail(e.target.value)} required></TextField>
                <FormLabel style={{ "textAlign": "left" }}>Password</FormLabel>
                <TextField id="password" onChange={e => setPassword(e.target.value)} required></TextField>
                <Button type="submit" variant="contained">Submit</Button>
            </FormControl>
        </form>
    );
};

export default LoginForm;