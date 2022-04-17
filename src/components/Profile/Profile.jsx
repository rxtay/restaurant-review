import React, {useEffect, useState} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '../Theme/Theme';
import Button from '@mui/material/Button'
import { TextField, FormControlLabel, RadioGroup, Radio, FormGroup, FormLabel} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const Profile = () => {
    const [triggered, setTriggered] = useState(true)
    const [user, setUser] = useState({
        _id: '',
        username: '',
        first: '',
        last: '',
        gender: '',
        address: '',
        number: '',
        email: '',
        avatar: null
    })

    useEffect(()=> {
        axios.get('http://localhost:5000/users/auth', 
        {withCredentials: true})
        .then(res =>{
            if (Cookies.get('sessionToken') === null) {
                // Redirect if null
                window.location.replace('http://localhost:3000/')
            } else {
                // Verify token
                axios.get(`http://localhost:5000/session/${Cookies.get('sessionToken')}`, {withCredentials: true})
                .then(res2 => {
                    if (res2.data) {
                        setUser({
                            _id: res.data._id,
                            username: res.data.username,
                            first: res.data.first,
                            last: res.data.last,
                            gender: res.data.gender,
                            address: res.data.address,
                            number: res.data.number,
                            email: res.data.email,
                            avatar: res.data.avatar
                        })
                    }
                })
                .catch(err => {
                    window.location.replace('http://localhost:3000/')
                })
            }
        })
        .catch(err => {
            Swal.fire({
                title: err.response.data[0].msg.main,
                text: err.response.data[0].msg.sub,
                timerProgressBar: true,
                timer: 1000,
                showConfirmButton: false
            }).then((result)=> {
                if (result.dismiss) {
                    window.location.replace('http://localhost:3000/')
                }
            })
        })
    }, [])

    const onChange = (event) => {
        setTriggered(false)
        setUser({...user, [event.target.name]: event.target.value})
    }

    const onClick = (method) => {
        switch(method){
            case 'submit':{
                const credentials = {...user}
                delete credentials._id
                axios.put(`http://localhost:5000/users/${user._id}`, credentials, {withCredentials: true})
                .then(res => {
                    Swal.fire({
                        icon: res.data[0].msg.type,
                        title: res.data[0].msg.main,
                        text: res.data[0].msg.sub,
                        timerProgressBar: true,
                        timer: 2000,
                        showConfirmButton: false
                    }).then((result)=> {
                        if(result.dismiss) {

                        }
                    })
                })
                break
            }
            case 'logout': {
                axios.delete(`http://localhost:5000/session/`, {withCredentials: true})
                .then(res => {
                    if (res.data) {
                        Swal.fire({
                            text: 'Please wait while you are being redirected...',
                            timerProgressBar: true,
                            timer: 3000,
                            showConfirmButton: false
                        }).then((result)=> {
                            if(result.dismiss) {
                                window.location.replace('http://localhost:3000/')
                            }
                        })
                    }
                })          
                break
            }
            case 'delete': {
                axios.delete(`http://localhost:5000/users/${user._id}`)
                .then(res => {
                    Swal.fire({
                        icon: res.data[0].msg.type,
                        title: res.data[0].msg.main,
                        text: res.data[0].msg.sub,
                        timerProgressBar: true,
                        timer: 3000,
                        showConfirmButton: false
                    }).then((result)=> {
                        if (result.dismiss) {
                            window.location.replace('http://localhost:3000/')
                        }  
                    })
                })
                break
            }
            default: {
                break
            }
        }    
    }

    const handleFileChange = (e, state, setState) => {
        if (e.target.files[0]) {
            setTriggered(false)
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onloadend = () => {
                setState({
                    ...state, 
                    ['avatar']:String(fileReader.result)
                })
            }
        }
    }

    const handleInput = (event) => {
        event.preventDefault()
        document.getElementById('file-input').click()
    }

    const handleRemove = (e, state, setState) => {
        e.preventDefault()
        setTriggered(!triggered)
        setState({...state, ['avatar']: null})
    }
    
    return (
        <React.Fragment>
            <ThemeProvider theme={Theme}>
                <section className="profile">
                    <div className="profile-panel">
                        <h1>Settings</h1>
                        <Button 
                            size="small"
                            variant="contained"
                            type="submit"
                            color="secondary"
                            onClick={() => {
                                onClick('delete')
                            }}
                            style={{
                                    textTransform:'none'
                                }}
                            >
                                Delete Account
                        </Button>

                        <Button 
                            size="small"
                            variant="contained"
                            type="submit"
                            onClick={() => {
                                onClick('logout')
                            }}
                            color="secondary"
                            style={{
                                    textTransform:'none'
                                }}
                            >
                                Logout
                        </Button> 
                    </div>
                    <div className="profile-info">
                        <div className="info-container">
                            <div className="info-wrapper"> 
                                <div style={{
                                    display: 'flex',
                                    width: 'fit-content',
                                    position: 'relative'
                                }}>
                                    <img 
                                    style={{
                                        objectFit: 'cover', 
                                        height: '70px', 
                                        width: '70px', 
                                        borderRadius: '50%',
                                        margin: '5px 0'
                                    }} 
                                    src={user.avatar !== null ? user.avatar: "https://i.ibb.co/MG40L2W/avatar-square-blue-120dp.png"} 
                                    alt="" 
                                    />
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '5px'}}>
                                        <div style={{display: 'flex'}}>
                                            <input
                                                onChange={(e)=> {
                                                    handleFileChange(e, user, setUser)
                                                }}
                                                accept='image/*' 
                                                id="file-input" 
                                                type="file" 
                                                style={{ display: "none" }
                                            }
                                            />
                                            <Button
                                            variant="contained"
                                            onClick={(e) => {
                                                handleInput(e)
                                            }}
                                            size='small'
                                            style={{
                                                margin: '5px',
                                                background: '#424242',
                                                fontFamily: 'Poppins',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                textTransform: 'none',
                                                height: 'fit-content',
                                                borderRadius: '5px'
                                            }}
                                            >
                                            Choose</Button>

                                            <Button
                                            variant="contained"
                                            onClick={(e) => {
                                                handleRemove(e, user, setUser)
                                            }}
                                            size='small'
                                            style={{
                                                margin: '5px',
                                                background: '#424242',
                                                fontFamily: 'Poppins',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                textTransform: 'none',
                                                height: 'fit-content',
                                                borderRadius: '5px'
                                            }}
                                            >
                                            Remove</Button>
                                        </div>
                                    </div>

                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '5px'
                                    }}>
                                        <TextField
                                        required
                                        label='Username'
                                        type='text'
                                        variant="outlined"
                                        color="light"
                                        size="small"
                                        name="username"
                                        value={user.username}
                                        onChange={onChange}
                                        />
                                        
                                        <TextField
                                        required
                                        label='Email Address'
                                        type='email'
                                        variant="outlined"
                                        color="light"
                                        size="small"
                                        name="email"
                                        value={user.email}
                                        onChange={onChange}
                                        />

                                        <TextField
                                        required
                                        label='First Name'
                                        type='text'
                                        variant="outlined"
                                        color="light"
                                        size="small"
                                        name="first"
                                        value={user.first}
                                        onChange={onChange}
                                        />

                                        <FormGroup>
                                            <FormLabel 
                                            className="gender-label" 
                                            component="legend"
                                            >Gender
                                            </FormLabel>
                                            <RadioGroup row
                                                name="gender"
                                                onChange={onChange}
                                                value={user.gender}
                                            >
                                            <FormControlLabel 
                                            value="male" 
                                            control={<Radio color="light"/>} 
                                            label="Male"/>

                                            <FormControlLabel 
                                            value="female" 
                                            control={<Radio color="light" />} 
                                            label="Female"/>
                                                
                                            </RadioGroup>
                                        </FormGroup>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '5px'
                                    }}>
                                        <TextField
                                        required
                                        label='Last Name'
                                        type='text'
                                        variant="outlined"
                                        color="light"
                                        size="small"
                                        name="last"
                                        value={user.last}
                                        onChange={onChange}
                                        />
                                        <TextField
                                        required
                                        label='Mobile Number'
                                        type='number'
                                        variant="outlined"
                                        color="light"
                                        size="small"
                                        name="number"
                                        value={user.number}
                                        onChange={onChange}
                                        />

                                        <TextField
                                        required
                                        label='Address'
                                        type='text'
                                        variant="outlined"
                                        color="light"
                                        size="small"
                                        name="address"
                                        value={user.address}
                                        onChange={onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="btn-action">
                                <Button 
                                size="small"
                                variant="contained"
                                color="grey"
                                style={{
                                        textTransform:'none'
                                    }}
                                >
                                Cancel
                                </Button>

                                <Button 
                                size="small"
                                variant="contained"
                                disabled={triggered}
                                onClick={() => {onClick('submit')}}
                                color="grey"
                                style={{
                                        textTransform:'none'
                                    }}
                                >
                                Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </ThemeProvider>
        </React.Fragment>
    )

}

export default Profile