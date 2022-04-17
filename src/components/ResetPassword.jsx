import React, { useState, useEffect } from 'react';
import { Theme } from './Theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button'
import {TextField} from '@mui/material';
import Background from '../assets/bg.jpg'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const {id} = useParams()
    const [password, setPassword] = useState({password: ''})

    useEffect(()=> {
        axios.get(`http://localhost:5000/forgot-password/reset/${id}`)
        .catch(err => {
            console.log(err.response.data)
            Swal.fire({
                icon: err.response.data.type,
                title: err.response.data.main,
                text: err.response.data.sub,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            }).then((result)=> {
                if (result.dismiss) {
                    window.location.replace('http://localhost:3000/')
                }  
            })
        })
    }, [])

    const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/forgot-password/reset/${id}`, password)
        .then(res => {
            Swal.fire({
                icon: res.data.type,
                title: res.data.main,
                text: res.data.sub,
                timerProgressBar: true,
                timer: 2000,
                showConfirmButton: false
            }).then((result)=> {
                if (result.dismiss) {
                    window.location.replace('http://localhost:3000/')
                }  
            })
        })
        .catch(err => {
            Swal.fire({
                icon: err.response.data.type,
                title: err.response.data.main,
                text: err.response.data.sub,
                timerProgressBar: true,
                timer: 2000,
                showConfirmButton: false
            }).then((result)=> {
                if (result.dismiss) {
                    window.location.replace('http://localhost:3000/')
                }  
            })
        })
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={Theme}>
                <section className='login'>
                    <div className="login-bg">
                        <img style={{width: '100%', height:'100%', objectFit: 'cover'}} src={Background} alt="" />
                    </div>
                    <div className="login-form">
                        <h1>Reset Password</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                            required
                            variant="filled"
                            color="light"
                            label="New Password"
                            size="small"
                            name="password"
                            onChange={handleChange}
                            type='password'
                            />
                            <Button
                            size="large"
                            variant="contained"
                            type="submit"
                            color="secondary"
                            >
                                Continue 
                            </Button>
                        </form>
                    </div>
                </section>
            </ThemeProvider>

        </React.Fragment>
    )
}

export default ResetPassword