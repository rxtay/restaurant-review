import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { submitUser } from '../api/register/RegisterAPI';
import { Theme } from './Theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import { PersonalInfo } from './RegisterForms/PersonalInfo';
import { EmailAddress } from './RegisterForms/EmailAddress';
import { Username } from './RegisterForms/Username';
import { Password } from './RegisterForms/Password';
import Background from '../assets/bg.jpg'


const Register = () => {
    const history = useHistory()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [currentStep, setCurrentStep] = useState(0)

    const [user, setUser] = useState({
        first: '',
        last: '',
        number: '',
        email: '',
        username: '',
        password: '',
        gender: 'male',
        address: ''
    })

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1)
    }

    const onSubmit = (e, method) => {
        switch (method) {
            case 'next': {
                setCurrentStep(prev => prev + 1)
                break;
            }
            case 'submit': {
                if (user.password === confirmPassword) {
                    submitUser(user, history, e)
                }
                break
            }
            default :{
                break
            }
        }
    }

    const onChange = (event) => {
        switch (event.target.name) {
            case 'confirmPassword': {
                setConfirmPassword(event.target.value)
                break;
            }
            default: {
                setUser({
                    ...user, 
                    [event.target.name]: 
                    event.target.value
                })
                break;
            }
        }
    }

    const Forms = [
        <PersonalInfo user={user} onChange={onChange} onSubmit={onSubmit}/>, 
        <EmailAddress user={user} onChange={onChange} prev={handlePrevious} onSubmit={onSubmit}/>,
        <Username user={user} onChange={onChange} prev={handlePrevious} onSubmit={onSubmit}/>,
        <Password onChange={onChange} onSubmit={onSubmit} prev={handlePrevious} user={user} confirmPassword={confirmPassword}/>
    ]

    return (
        <React.Fragment>
            <ThemeProvider theme={Theme}>
                <section className="login">
                    <div className="login-bg">
                        <img style={{width: '100%', height:'100%', objectFit: 'cover'}} src={Background} alt="" />
                    </div>
                    <div className="login-form">
                            <h1>Register</h1>
                            {Forms[currentStep]}
                    </div>
                </section>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default Register