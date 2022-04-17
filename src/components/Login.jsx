import axios from 'axios';
import React from 'react';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import AppContext from '../context/AppContext';
import { useHistory } from 'react-router-dom';
import { Theme } from './Theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button'
import {TextField} from '@mui/material';
import Cookies from 'js-cookie';
import Background from '../assets/bg.jpg'

const Login = () => {
    const {user, setUser, setSessionToken} = useContext(AppContext)
    const history = useHistory();

    const onChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        axios.get('http://localhost:5000/users/auth', 
        {withCredentials: true})
        .then(res =>{
            if (Cookies.get('sessionToken') !== null) {
                axios.get(`http://localhost:5000/session/${Cookies.get('sessionToken')}`, {withCredentials: true})
                .then(res=> {
                    if (res.data) {
                        history.push('/restaurants')       
                    }
                })
            }
        })
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:5000/users/login/`, {
            username: user.username, 
            password: user.password
        }, { withCredentials: true })
        .then(res => {
            axios.post(`http://localhost:5000/session/`, {withCredentials: true})
            Swal.fire({
                icon: res.data[0].msg.type,
                title: res.data[0].msg.main,
                text: res.data[0].msg.sub,
                timerProgressBar: true,
                timer: 2000,
                showConfirmButton: false
            }).then((result)=> {
                if (result.dismiss) {
                    history.push('/restaurants')
                }  
            })
        }).catch(err => {
            Swal.fire({
                icon: err.response.data[0].msg.type,
                title: err.response.data[0].msg.main,
                text: err.response.data[0].msg.sub,
                timerProgressBar: true,
                timer: 2000,
                showConfirmButton: false
            }).then((result)=> {
                if(result.dismiss) {
                    window.location.reload(true)
                }
            })
        })
    }

    return (
        <React.Fragment >
            <ThemeProvider theme={Theme}>
                <section className="login">
                    <div className="login-bg">
                        <img style={{width: '100%', height:'100%', objectFit: 'cover'}} src={Background} alt="" />
                    </div>
                    <div className="login-form">
                        <h1>Sign In</h1>
                        <form onSubmit={onSubmit}>
                            
                            <TextField
                            required
                            variant="filled"
                            color="light"
                            label="Username"
                            size="small"
                            name="username"
                            onChange={onChange}
                            type='text'
                            />

                            <TextField
                            required
                            type='password'
                            variant="filled"
                            color="light"
                            label="Password"
                            size="small"
                            name="password"
                            onChange={onChange}
                            />

                            <Button
                            size="large"
                            variant="contained"
                            type="submit"
                            color="secondary"
                            >
                                Continue 
                            </Button>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                margin: '5px 0'
                            }}>
                                <a href="/register">Register</a>
                                <a href="/forgot-password">Forgot your password?</a>
                            </div>
                        </form>
                    </div> 
                </section>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default Login;