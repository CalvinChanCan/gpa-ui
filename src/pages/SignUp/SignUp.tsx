import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Alert, Card, Snackbar} from "@mui/material";
import {fetchData} from "../../utils/makeRequest";

const SignUp = () => {
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");

        const data = {email, password, first_name: firstName, last_name: lastName};
        const response = await fetchData("/signup/", "POST", data);

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem("user", JSON.stringify(result.user));
            navigate("/accounts");
        } else {
            setIsError(true);
        }
    };

    return (
        <div className="signin-container">
            <Card variant="outlined">
                <Container component="main" maxWidth="xs">
                    <Box sx={{marginTop: 8, padding: 3}}>
                        <Typography component="h1" variant="h3" align="center">
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="given-name"
                                sx={{mt: 2}}
                            />
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                sx={{mt: 2}}
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                sx={{mt: 2}}
                            />
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                sx={{mt: 2}}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Container>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    open={isError}
                    autoHideDuration={3000}
                    onClose={() => setIsError(false)}
                    message="Error signing up"
                >
                    <Alert onClose={() => setIsError(false)} severity="error">
                        This is an error message!
                    </Alert>
                </Snackbar>


            </Card>
        </div>
    );
};

export default SignUp;
