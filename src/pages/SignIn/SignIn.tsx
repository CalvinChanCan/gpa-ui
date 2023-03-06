import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert, Card, Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import './SignIn.scss';
import {fetchData} from "../../utils/makeRequest";

const SignIn = () => {
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const data = {email, password};
        const response = await fetchData('/signin/', 'POST', data);

        if (response.ok) {
            const result = await response.json();

            localStorage.setItem('user', JSON.stringify(result.user));
            navigate("/accounts");
        } else {
            // If sign in fails, show error message
            setIsError(true)

        }

    };

    useEffect(() => {


    }, [isError]);

    return (
        <div className="signin-container">
            <Card variant="outlined">
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box sx={{marginTop: 8, padding: 3}}>
                        <Typography component="h1" variant="h3" align="center">
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={isError}
                autoHideDuration={3000}
                onClose={() => setIsError(false)}
                message="Error logging in"
            >
                <Alert onClose={() => setIsError(false)} severity="error">This is an error message!</Alert>
            </Snackbar>
        </div>
    );

}

export default SignIn;
