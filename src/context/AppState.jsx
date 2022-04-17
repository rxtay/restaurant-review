import React from "react";
import AppContext from './AppContext'
import { useState} from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const AppState = (props) => {
    const [show, setShow] = useState({
        updateComment: false, 
        updateDescription: false, 
        updateCategory: false
    })
    
    
    const getDefault = (method) => {
        switch(method) {
            case 'description': {
                return {
                    _id: 0, 
                    name: '', 
                    imageURL: '', 
                    address: '', 
                    description: '', 
                    user_id: '', 
                    type: '', 
                    startDay: '', 
                    endDay: '', 
                    startTime: '', 
                    endTime: ''
                }
            }
            case 'comment': {
                return {
                    user_id: 0, 
                    username: '', 
                    rating: 0, 
                    comment: '', 
                    restaurant_id: 0, 
                    _id: 0, 
                    type: { action: '', button: '', title: ''}
                }
            }
            case 'category': {
                return {
                    _id: 0, 
                    category: '', 
                    imageURL: '', 
                    type: { action: '', button: '', title: ''}
                }
            }
            default: {
                break
            }
        }

    }

    //State variable for comment form
    const [comment, setComment] = useState({
        user_id: 0, 
        username: '', 
        rating: 0, 
        comment: '', 
        restaurant_id: 0, 
        comment_id: 0, 
        type: { action: '', button: '', title: ''}
    }) 

    //State variables for description form
    const [descForm, setDescForm] = useState({
        _id: 0, 
        name: '', 
        imageURL: '', 
        address: '', 
        description: '', 
        user_id: 0, 
        type: '',
        startDay: '', 
        endDay: '', 
        startTime: '', 
        endTime: ''
    })

    const [user, setUser] = useState({
        username: '', 
        password: '', 
        id: 0
    })

    const [categoryForm, setCategoryForm] = useState({
        _id: 0, 
        category: '', 
        imageURL: '', 
        type: { action: '', button: '', title: ''}
    })
    
    const onCancel = () => {
        setShow({
            updateComment: false, 
            updateDescription: false, 
            updateCategory: false
        })
    }

    function authUser() {
        axios.get('http://localhost:5000/users/auth', 
        {withCredentials: true})
        .then(res1 => {
            // Check if session token exist
            if (Cookies.get('sessionToken') === null) {
                // Redirect if null
                window.location.replace('http://localhost:3000/')
            } else {
                // Verify token
                axios.get(`http://localhost:5000/session/${Cookies.get('sessionToken')}`, {withCredentials: true})
                .then(res=> {
                    if (res.data) {
                        // Set user state if token is verified
                        setUser({
                            username: res1.data.username,
                            password: res1.data.password,
                            id:res1.data._id
                        })
                        return true             
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
    }

    return (
        <AppContext.Provider value={{
            show, setShow,
            comment, setComment, 
            descForm, setDescForm, 
            onCancel, 
            user, setUser, 
            categoryForm, setCategoryForm,
            getDefault,
            // setSessionToken, deleteToken, verifySessionToken,
            authUser
        }}>
        {props.children}
        </AppContext.Provider>
    )
}

export default AppState;