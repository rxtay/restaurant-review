import React, {useEffect, useState, useContext } from 'react';
import { getAllCategories } from "../../api/categories/CategoriesAPI";
import Body from '../Body';
import AppContext from '../../context/AppContext';
import CategoryForm from './modals/CategoryForm';
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([])
    const {setShow, setCategoryForm, authUser, show} = useContext(AppContext)

    useEffect(()=> {
        authUser()
        axios.get('http://localhost:5000/categories/')
        .then(res => {
            setCategories(res.data)
        })
    }, [])

    const handleForm = (method) => {
        setShow({
            ...show,
            updateCategory: true
        })
        switch (method) {
            case 'new': {
                setCategoryForm({
                    _id: 0,
                    category: '', 
                    imageURL: '', 
                    type: { action: 'new', button: 'Submit', title: 'New'}
                })
                break
            }
            default: {
                break
            }
        }
    }

    const handleSearch = (e) => {
        if (e.target.value !== '') {
            axios.get(`http://localhost:5000/search/categories`, {
                headers : {
                    name: e.target.value
                }
            })
            .then(res => {
                setCategories(res.data)
            })
        } else {
            getAllCategories(setCategories)
        }
    }

    return (
        <React.Fragment>
            <section className="parent-container">
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
                            handleForm('new')
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
                    Add New</Button>
                </div>
                <Body type='categories' obj={categories} />
            </section>
            <CategoryForm setState={setCategories}/>
        </React.Fragment>
    )
}
export default Categories