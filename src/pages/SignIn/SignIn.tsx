import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Card} from "@mui/material";
import {useNavigate} from "react-router-dom";
import './SignIn.scss';

const SignIn = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        console.log(email, password);

        navigate("/accounts");

    };

    return (
        <div className="signin-container">
            <Card variant="outlined">
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box sx={{marginTop: 8, padding: 3}}>
                        <Typography component="h1" variant="h3">
                            GPA
                        </Typography>
                        <Box component="form" onSubmit={(event) => handleSubmit(event)}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address/Username"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Card>
        </div>
    );

}

export default SignIn;
