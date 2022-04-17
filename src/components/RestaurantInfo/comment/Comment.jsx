import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../../../context/AppContext';
import axios from 'axios'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Comment = ({id, setComments, comments}) => {
    const {setShow, setComment, show, getDefault, user} = useContext(AppContext);

    useEffect(()=> {
        axios.get(`http://localhost:5000/comments/${id}`)
        .then(res => {
            setComments(res.data)
        })
    },[])

    const onClick = (method, value) => {
        setShow({
            ...show,
            updateComment: true
        })
        switch (method) {
            case 'UPDATE_COMMENT': {
                const data = {...value}
                delete data.username
                if (value.restaurant_id !== 0) {
                    setComment({
                        ...data,
                        type: {action: 'update', button: 'Update', title: 'Update'}
                    })
                }
                break;
            }
            case 'NEW_COMMENT' : {
                setComment({
                    ...getDefault('comment'),
                    restaurant_id: id,
                    type: {action: 'new', title: 'New', button: 'Submit'}
                })
                break;
            }
            default: {
                break
            }
        }
    }

    const deleteComment = (value) => {
        if(value.restaurant_id !== 0) {
            axios.delete(`http://localhost:5000/comments/${id}/${value._id}`)
            .then(res => {
                setComments(res.data)
            })
        }
    }

    return (
        <div style={{
            color: 'white',
            fontFamily: 'Poppins',
            marginTop: '16px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent:'space-between',
                height: 'fit-content',
                position: 'relative'
            }}>
                <span
                style={{
                    fontSize: '18px'
                }}
                >Comments</span>
                <Button
                variant="contained"
                onClick={()=> {
                    onClick('NEW_COMMENT')
                }}
                size='small'
                style={{
                    marginLeft: '10px',
                    background: '#424242',
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                    fontWeight: '600',
                    textTransform: 'none'  
                }}
                >New</Button>
            </div> 
            {comments.map((value,key) => {
                return (
                    <div className='comment-container'>
                        <img 
                        style={{
                            objectFit: 'cover', 
                            height: '60px', 
                            width: '60px', 
                            borderRadius: '50%',
                            margin: '5px 0'
                        }} 
                        src={value.avatar !== null ? value.avatar:"https://i.ibb.co/MG40L2W/avatar-square-blue-120dp.png"} 
                        alt="" 
                        />
                        <div style={{
                            display:'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            margin: '0 10px'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around'
                            }}>
                                <span>{value.username}</span>
                                <div>
                                    {(()=>{
                                    let stars = [];
                                    for(let i =0; i < value.rating; i++) {
                                        stars.push(
                                            <span
                                            style={{
                                                display: 'inline-block',
                                                paddingRight: '2px',
                                                justifyContent: 'flex-start',
                                                color: '#FC5296'
                                            }} 
                                            class="fa fa-star" aria-hidden="true"></span>
                                        )
                                    }
                                    return stars;
                                    })()}
                                </div>
                                <span
                                style={{
                                    fontSize: '13px'
                                }}
                                >{value.comment}</span>
                                <span style={{
                                    fontSize: '12px',
                                    margin: '2px 0'
                                }}>{new Date(value.date).toString()}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                {user.id === value.user_id ?
                                <div style={{
                                    display: 'flex'
                                }}>
                                    <EditIcon
                                    style={{
                                        cursor: 'pointer',
                                        color: '#FC5296'
                                    }}
                                    onClick={()=> {
                                        onClick('UPDATE_COMMENT', value)
                                    }}
                                    />
                                    <DeleteIcon 
                                    style={{
                                        cursor: 'pointer',
                                        color: '#FC5296'
                                    }}
                                    onClick={() => {
                                        deleteComment(value)
                                    }}
                                    />
                                </div>:null
                                }
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Comment;