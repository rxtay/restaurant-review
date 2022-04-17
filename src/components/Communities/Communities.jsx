import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import CommunityModal from './modals/CommunityModal'
import AppContext from '../../context/AppContext'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';

const Communities = () => {
    const [data, setData]= useState([])
    const [show, setShow] = useState(false)
    const {user, authUser} = useContext(AppContext)

    useEffect(()=>{
        authUser()
        axios.get('http://localhost:5000/communities/')
        .then(res => {
            setData(res.data)
        })
    },[])

    const handleSearch = (e) => {
        if (e.target.value !== '') {
            axios.get(`http://localhost:5000/search/communities`, {
                headers : {
                    name: e.target.value
                }
            })
            .then(res => {
                setData(res.data)
            })
        } else {
            axios.get('http://localhost:5000/communities/')
            .then(res => {
                setData(res.data)
            })
        }
    }

    return (
        <React.Fragment>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 10%'
            }}>
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
                <div style={{display: 'flex', justifyContent: 'flex-end', background: '#202020', margin: '10px 0.5%'}}>
                    <Button 
                    style={{
                        background: 'linear-gradient(to right, #f67062, #fc5296)',
                        fontFamily: 'Poppins',
                        fontSize: '13px',
                        fontWeight: '600',
                        textTransform: 'none'
                    }}
                    size='small'
                    variant="contained"
                    onClick={() => {
                        setShow(!show)
                    }}
                    >
                    Add New
                    </Button>
                </div>
                <div className="container-grid">
                    {data.map((value, key)=> {
                        return (
                            <a href={`/communities/${value._id}`} className="card"> 
                                <h5>{value.name}</h5>     
                            </a>
                        )
                    })}        
                </div>
            </div>
            <CommunityModal user={user} show={show} setShow={setShow} setData={setData}/>
        </React.Fragment>
    )
}

export default Communities