import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import login from '../../../images/login.png'

const SiggnUp = () => {

    const [loginData, setLoginData] = useState({})
    const history = useHistory()

    const { user, error, registerUser, isLoading } = useAuth()
    const handleonBlur = e => {
        const nameField = e.target.name
        const nameValue = e.target.value
        // ager object er  sob value ... diye copy kora hoilo karon email r pass ekta te ekbar typehobe baki ta copy thakbe 
        const newLoginData = { ...loginData }
        // jeita k click korbo tar data update hobo ager data to ... e copy achei
        newLoginData[nameField] = nameValue
        setLoginData(newLoginData)


    }
    const handleSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('PassWord Does not matched')
            return
        }
        registerUser(loginData.email, loginData.password,loginData.name,history)
        // page reload auto jeno na hoi
        e.preventDefault()
    }
    return (
        <Container >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ marginTop: 16 }}>

                    <Typography variant="body1" gutterBottom component="div">
                        Sign-up
                    </Typography>
                    {!isLoading && <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ width: '100%', m: 1 }}
                            label="Your Name"
                            variant="standard"
                            color="primary"
                            name="name"
                            type="text"
                            onBlur={handleonBlur}
                            focused
                        /> 
                           <TextField
                            sx={{ width: '100%', m: 1 }}
                            label="Your Email"
                            variant="standard"
                            color="primary"
                            name="email"
                            type="email"
                            onBlur={handleonBlur}
                            focused
                        />
                        <TextField
                            sx={{ width: '100%', m: 1 }}
                            label="Your Password"
                            variant="standard"
                            color="primary"
                            type="password"
                            name="password"
                            onBlur={handleonBlur}
                            focused
                        />
                        <TextField
                            sx={{ width: '100%', m: 1 }}
                            label="Confirm Your Password"
                            variant="standard"
                            color="primary"
                            type="password"
                            name="password2"
                            onBlur={handleonBlur}
                            focused
                        />

                        <Button variant="contained" type="submit" sx={{ width: '100%', m: 1 }}>Sign-up</Button>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="text">Already have an account ? please login</Button>
                        </Link>
                    </form>}
                    {
                        isLoading && <CircularProgress />
                    }
                    {user?.email && <Alert severity="success">Your account create successfully!!!</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} style={{ width: '100%', height: '500px' }} alt="" />

                </Grid>

            </Grid>
        </Container>
    );
};

export default SiggnUp;