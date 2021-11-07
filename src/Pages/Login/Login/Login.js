import { Button, Container, Grid, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import login from '../../../images/login.png'
import useAuth from './../../../Hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({})
    const location = useLocation()
    const history = useHistory()
    const { user, loginUser, isLoading, error, googleSignin } = useAuth()
    const handleOnChange = e => {
        const nameField = e.target.name
        const nameValue = e.target.value
        // ager object er  sob value ... diye copy kora hoilo karon email r pass ekta te ekbar typehobe baki ta copy thakbe 
        const newLoginData = { ...loginData }
        // jeita k click korbo tar data update hobo ager data to ... e copy achei
        newLoginData[nameField] = nameValue
        setLoginData(newLoginData)

    }
    const handleSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history)
        // page reload auto jeno na hoi
        e.preventDefault()
    }
    const handleGoogleSignin=()=>{
        googleSignin(location,history)
    }

    return (
        <Container >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ marginTop: 16 }}>

                    <Typography variant="body1" gutterBottom component="div">
                        Log-in
                    </Typography>
                    <Button onClick={handleGoogleSignin} variant="contained" color="success">
                       Signin with  Google 
                    </Button>
                    <p>------OR-----</p>
                    
                    {!isLoading && <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ width: '100%', m: 1 }}
                            label="Your Email"
                            variant="standard"
                            color="primary"
                            name="email"
                            onChange={handleOnChange}
                            focused
                        /> <br />
                        <TextField
                            sx={{ width: '100%', m: 1 }}
                            label="Your Password"
                            variant="standard"
                            color="primary"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            focused
                        />

                        <Button variant="contained" type="submit" sx={{ width: '100%', m: 1 }}>Login</Button>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <Button variant="text">New to here ? please Register</Button>
                        </Link>
                    </form>}

                    {
                        isLoading && <CircularProgress />
                    }
                    {user?.email && <Alert severity="success">Login successfully!!!</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} style={{ width: '100%', height: '500px' }} alt="" />

                </Grid>

            </Grid>
        </Container>
    );
};

export default Login;