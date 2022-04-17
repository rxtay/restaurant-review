import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios'
import AppContext from '../../context/AppContext';
import { getAllRestaurants } from '../../api/restaurants/RestaurantsAPI';
import DescriptionForm from '../RestaurantInfo/modals/DescriptionForm';
import Body from '../Body'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';
import { TextField } from '@mui/material';

axios.defaults.withCredentials = true;

const Restaurants = () => {
    const {setShow, setDescForm, authUser, show, getDefault} = useContext(AppContext);
    const [restaurants, setRestaurants] = useState([])
    const [categories, setCategories] = useState([])
    const [isChecked, setCheck] = useState(0)
    const [searchTerm, setSearch] = useState('')

    useEffect(() => {
        authUser()
        axios.get('http://localhost:5000/categories')
        .then(res => {
            setCategories(res.data)
        })
        getAllRestaurants(setRestaurants, setCheck)     
    }, [])

    const handleForm = () => {
        setDescForm({
            ...getDefault('description'),
            type: 'Submit'
        })
        setShow({
            ...show,
            updateDescription: true
        })
        
    }

    const handleChange = (e, value) => {
        if (searchTerm !== '') {
            if (e.target.checked) {
                    searchCategory(searchTerm, value._id)
                    setCheck(value._id)
            } else {
                search(searchTerm)
                setCheck(0) 
            }
        } else {
            if (e.target.checked) {
                getCategory(value._id)
                setCheck(value._id)
            } else {
                getAllRestaurants(setRestaurants, setCheck)
            }

        }
    }

    const searchCategory = (name, id) => {
        axios.get(`http://localhost:5000/categories/filtered/${id}`, {
            headers: {
                name: name
            }
        })
        .then(res => {
            setRestaurants(res.data)
        })
    }

    const search = (name) => {
        axios.get('http://localhost:5000/search/restaurants/', {
            headers: {
                name: name
            }
        })
        .then(res => {
            setRestaurants(res.data)
        })
    }

    const getCategory = (id) => {
        axios.get(`http://localhost:5000/categories/${id}`)
        .then(res => {
            setRestaurants(res.data[1])
        })
    }

    const handleSearch = (e) => {
        if (isChecked !== 0) {
            if (searchTerm !== '') {
                searchCategory(e.target.value, isChecked)
            } else {
                getCategory(isChecked)
            }
        } else {
            if (searchTerm !== '') {
                search(e.target.value)
            } else {
                axios.get('http://localhost:5000/categories')
                .then(res => {
                    setCategories(res.data)
                })
                getAllRestaurants(setRestaurants, setCheck)
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
                    value={searchTerm}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        handleSearch(e)
                    }}
                    fullWidth
                    variant="filled"
                    hiddenLabel
                    placeholder="Search here..."
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px 0.5%'}}>
                    <Button
                        variant="contained"
                        onClick={handleForm}
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
                <div style={{
                    width: '100%',
                    display: 'flex',
                    position: 'relative'
                }}>
                    <div style={{
                        flex:1,
                        borderRadius: '5px',
                        background: '#343434',
                        margin: '5px',
                        display: 'flex',
                        justifyContent:'center',
                        minHeight: '70vh'
                    }}>
                        <FormGroup style={{margin: '10px'}}>
                            {categories.map((value, key)=> {
                                return (
                                <FormControlLabel
                                style={{
                                    color: '#fff'
                                }}
                                control={<Checkbox onChange={(e) => {handleChange(e, value)}} checked={isChecked === value._id} style={{color: '#FC5296'}}/>}
                                label={<FormLabel style={{fontFamily: 'Poppins', color: '#ECECEC', fontWeight: '500'}}>{value.category}</FormLabel>}
                                />
                                )
                            })}
                        </FormGroup>
                    </div>
                    <div style={{flex:7}}>
                        <Body obj={restaurants} type="restaurants"/>
                    </div>
                </div>
            </div>
            <DescriptionForm setState={setRestaurants}/>
        </React.Fragment>
    )}

export default Restaurants;