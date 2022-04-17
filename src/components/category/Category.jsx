import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router'
import { getCategory, deleteCategory} from '../../api/category/CategoryAPI'
import Body from '../Body'
import AppContext from '../../context/AppContext'
import CategoryForm from '../categories/modals/CategoryForm'
import Button from '@mui/material/Button'
import { Modal } from "react-bootstrap";
import axios from 'axios'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { TextField } from '@mui/material';


const Category = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([])
    const { setCategoryForm, setShow, authUser, show, user} = useContext(AppContext)
    const [modal, setModal] = useState(false)
    const [manage, setManage] = useState({
        category: [],
        restaurants: [],
    })

    useEffect(()=> {
        // setTimeout(() => {
        authUser()
        getCategory(setCategory, setCategoryForm, id)
        // }, 100)
    }, [])

    const onClick = (method) => {
        switch (method) {
            case 'update': {
                setShow({
                    ...show,
                    updateCategory: true
                })
                break;
            }
            case 'remove': {
                deleteCategory(id)
                break;
            }
            case 'manage': {
                axios.get(`http://localhost:5000/restaurants-categories/${id}`)
                .then(res => {
                    console.log(res.data)
                    setManage({
                        category: res.data[0],
                        restaurants: res.data[1]
                    })
                    setModal(!modal)
                })
                break
            }
            case 'done':{
                getCategory(setCategory, setCategoryForm,id)
                setModal(!modal)
                break
            }
            default: {
                break
            }
        }
    }

    const handleRemove = (value) => {
        axios.delete(`http://localhost:5000/restaurants-categories/${id}/${value._id}`)
        .then(res => {
            setManage({
                ...manage,
                restaurants: res.data[1]
            })
        })
    }

    const handleAdd = (value) => {
        axios.post(`http://localhost:5000/restaurants-categories/${id}`, {
            restaurant_id: value._id
        })
        .then(res => {
            setManage({
                ...manage,
                restaurants: res.data[1]
            })
        })
    }

    const handleSearch = (e) => {
        switch (e.target.value !== '') {
            case true: {
                axios.get(`http://localhost:5000/categories/filtered/${id}`, {
                    headers: {
                        name: e.target.value
                    }
                })
                .then(res => {
                    setCategory(res.data)
                })
                break
            }
            default: {
                getCategory(setCategory, setCategoryForm, id)
            }
        }
    }

    return (
        <React.Fragment>
            <div className="parent-container">
                <div className='search'>
                    <TextField
                    style={{
                        background: '#343434',
                        borderRadius: '5px',
                        maxWidth: '50%',
                    }}
                    onChange={handleSearch}
                    fullWidth
                    variant="filled"
                    hiddenLabel
                    placeholder="Search here..."
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px 0.5%'}}>
                <Button
                        variant="contained"
                        onClick={() => {
                            onClick('manage')
                        }}
                        size='small'
                        style={{
                            background: 'linear-gradient(to right, #f67062, #fc5296)',
                            fontFamily: 'Poppins',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'none'  
                        }}
                    >
                    Manage</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            onClick('update')
                        }}
                        size='small'
                        style={{
                            marginLeft:'8px',
                            background: 'linear-gradient(to right, #f67062, #fc5296)',
                            fontFamily: 'Poppins',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'none'  
                        }}
                    >
                    Edit</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            onClick('remove')
                        }}
                        size='small'
                        style={{
                            marginLeft: '8px',
                            background: 'linear-gradient(to right, #f67062, #fc5296)',
                            fontFamily: 'Poppins',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'none'  
                        }}
                    >
                    Remove</Button>  
                </div>
                <Body type='restaurants' obj={category} />
            </div>
            <CategoryForm setState={null}/>
            <Modal show={modal}>
                <Modal.Header style={{
                    fontFamily: 'Poppins',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '18px'
                }}> 
                    {manage.category.map((value, key)=> {
                        return value.name
                    })}
                </Modal.Header>
                <Modal.Body>
                    <div className="outer-container">
                        {manage.restaurants.map((value, key)=> {
                            return <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontFamily: 'Poppins',
                                fontSize:'18px'
                            }}>
                               {value.name}
                               {value.category === null ?  
                                <AddCircleIcon
                                onClick={()=> {
                                    handleAdd(value)
                                }}
                                style={{
                                    color: '#202020'
                                }}/>:
                                <RemoveCircleIcon
                                onClick={()=>{
                                    handleRemove(value)
                                }}
                                style={{
                                    color: '#202020'
                                }}/>
                                }
                            </div>
                        })}
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                       <Button
                        variant="contained"
                        size='small'
                        onClick={()=> {
                            onClick('done')
                        }}
                        style={{
                            marginLeft: '10px',
                            background: '#202020',
                            fontFamily: 'Poppins',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'none'  
                        }}
                        >Done</Button> 
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default Category