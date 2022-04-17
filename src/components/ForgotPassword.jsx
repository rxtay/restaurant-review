import React, { useState} from 'react';
import Swal from 'sweetalert2';
import { Theme } from './Theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Background from '../assets/bg.jpg'
import {TextField} from '@mui/material';
import Button from '@mui/material/Button'
import axios from 'axios';


const ForgotPassword = () => {
    const [email, setEmail] = useState({email: ''})

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/forgot-password/`, email)
        .then(res => {
            Swal.fire({
                icon: res.data.type,
                title: res.data.main,
                text: res.data.sub,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            }).then((result)=> {
                if (result.dismiss) {
                    window.location.reload(true)
                }  
            })
        })
        .catch(err => {
            Swal.fire({
                icon: err.response.data.type,
                title: err.response.data.main,
                text: err.response.data.sub,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            })
        })
    }

    const handleChange = (e) => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value
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
                        <h1>Forgot Password</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                            required
                            variant="filled"
                            color="light"
                            label="Email Address"
                            size="small"
                            name="email"
                            onChange={handleChange}
                            type='email'
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

export default ForgotPassword