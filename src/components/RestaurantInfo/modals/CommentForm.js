import React from "react";
import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import { Modal } from "react-bootstrap";
import { handleSubmit } from "../../../api/restaurantInfo/CommentAPI";
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from '@mui/material';

const CommentForm = ({setState}) => {
    const {show, comment, setComment, onCancel, user, setShow} = useContext(AppContext);
    var rating = [1, 2, 3, 4, 5]

    //Submit new comment or update comment
    const onSubmit = (e) => {
        if (show.updateComment) {
            handleSubmit(e, comment, user, setState, setShow, show)
        }
    }

    //On change events for comment
    const onChangeComment = event => {
        setComment({
            ...comment,
            [event.target.name]: event.target.value
        })
    }
    
    return (
        <Modal show={show.updateComment}>
            <Modal.Header style={{
                fontFamily:'Poppins',
                display:'flex',
                justifyContent:'center',
                fontSize: '18px'
            }}>
                {comment.type.title} Comment
            </Modal.Header>
            
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <div className="outer-container">
                        <div style={{
                            width:'50%',
                            position:'relative',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}>
                            <FormControl
                            fullWidth
                            variant="filled"
                            >
                                <InputLabel id="rating">Rating</InputLabel>
                                <Select
                                required
                                labelId='rating'
                                size="small"
                                name="rating"
                                value={comment.rating}
                                onChange={onChangeComment}
                                >
                                {rating.map((value, key)=> {
                                    return <MenuItem value={value}>{value}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{
                            margin: '10px 0'
                        }}>
                            <TextField
                            required
                            variant="filled"
                            fullWidth
                            minRows={4}
                            multiline
                            hiddenLabel
                            placeholder="Enter your comment..."
                            style={{
                                padding: '5px'
                            }}
                            name="comment"
                            minLength="100"
                            maxLength="1024"
                            value={comment.comment}
                            onChange={onChangeComment}
                            />

                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent:'flex-end'
                        }}>
                            <Button
                            variant="contained"
                            onClick={(e)=> {
                                e.preventDefault()
                                onCancel()
                            }}
                            size='small'
                            style={{
                                marginLeft: '10px',
                                background: '#202020',
                                fontFamily: 'Poppins',
                                fontSize: '13px',
                                fontWeight: '600',
                                textTransform: 'none'  
                            }}
                            >Cancel</Button>

                            <Button
                            variant="contained"
                            type="submit"
                            size='small'
                            style={{
                                marginLeft: '10px',
                                background: '#202020',
                                fontFamily: 'Poppins',
                                fontSize: '13px',
                                fontWeight: '600',
                                textTransform: 'none'  
                            }}
                            >{comment.type.button}</Button>
                        </div>
                    </div>
                </form>        
            </Modal.Body>
            </Modal>
    )}

export default CommentForm