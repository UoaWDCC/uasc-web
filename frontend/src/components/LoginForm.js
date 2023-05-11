import { Button, FormControl, FormLabel, TextField } from "@mui/material";

const LoginForm = () => {

    const handleSubmit = () => {
        console.log("Form submitted");
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel style={{ "textAlign": "left" }}>Username</FormLabel>
                <TextField required></TextField>
                <FormLabel style={{ "textAlign": "left" }}>Password</FormLabel>
                <TextField required></TextField>
                <Button type="submit" variant="contained">Submit</Button>
            </FormControl>
        </form>
    );
};

export default LoginForm;