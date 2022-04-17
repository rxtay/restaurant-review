import React, {useContext, useState} from 'react';
import AppContext from '../../../context/AppContext';
import { Modal } from "react-bootstrap";
import Unknown from '../../../assets/unknown.png'
import { handleSubmit } from '../../../api/category/CategoryAPI';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button'

const CategoryForm = ({setState}) => {
    const {show, onCancel, categoryForm, setCategoryForm, user, setShow} = useContext(AppContext)
    const [display, setDisplay] = useState(false)

    const onChange = event => {
        setDisplay(false)
        setCategoryForm({
            ...categoryForm,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (e) => {
        if (show.updateCategory) {
            handleSubmit(e, categoryForm, user, setState, setShow, show)
        }
    }

    const imageExists = () => {
        fetch(categoryForm.imageURL, {
            method: 'HEAD',
            mode:'no-cors'
        })
        .then(res => {
            setDisplay(true)
        })
        .catch(err => {
            setDisplay(false)
        })  
    }
    
    return (
        <Modal show={show.updateCategory}>
            <Modal.Header 
                style={{
                    fontFamily:'Poppins',
                    display:'flex',
                    justifyContent:'center',
                    fontSize: '18px'
                }}>        
               {categoryForm.type.title} Category
            </Modal.Header>
            <Modal.Body>
                <div className="outer-container">
                    <div className="inner-container">
                        <div style={{
                            maxWidth: '50%', 
                            justifyContent: 'space-evenly',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '5px'
                        }}>
                            <TextField
                            style={{
                                padding: '5px'
                            }}
                            variant="filled"
                            hiddenLabel
                            placeholder="Give it a creative name!"
                            size="small"
                            name="category"
                            value={categoryForm.category}
                            onChange={onChange}
                            />
                            <TextField
                            style={{
                                padding: '5px'
                            }}
                            variant="filled"
                            hiddenLabel
                            placeholder="Image Source"
                            size="small"
                            name="imageURL"
                            onBlur={() => { 
                                imageExists()    
                            }}
                            value={categoryForm.imageURL}
                            onChange={onChange}
                            />
                        </div>
                        
                        <div style={{width:'50%'}}>
                            {display ? 
                            <img style={{
                                width: '100%', padding: '5px', borderRadius: '10px'
                            }} 
                            alt="" src={Unknown}></img>
                            :<img style={{
                                width: '100%', padding: '5px', borderRadius: '10px'
                                }} 
                            alt="" src={categoryForm.imageURL}></img>}
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '10px'
                    }}>
                        <Button
                        variant="contained"
                        onClick={(e) => {
                            e.preventDefault()
                            onCancel()
                        }}
                        size='small'
                        style={{
                            background: '#202020',
                            fontFamily: 'Poppins',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'none'  
                        }}
                        >
                        Cancel</Button>
                        <Button
                        variant="contained"
                        onClick={onSubmit}
                        size='small'
                        style={{
                            marginLeft: '10px',
                            background: '#202020',
                            fontFamily: 'Poppins',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'none'  
                        }}
                        >
                        {categoryForm.type.button}</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default CategoryForm
