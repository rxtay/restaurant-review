import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../../../context/AppContext';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Description = ({id, description, setDescription}) => {
    const {setDescForm, setShow, show, user} = useContext(AppContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/restaurants/${id}`)
        .then(res => {
            setDescription(res.data)
        })
    }, [])
    

    const formatOption = (method, value) => {
        switch (method) {
            case 'day': {
                const array = String(value).split(',')[0].split('-')
                return {start: array[0], end: array[1]}
                
            }
            case 'time': {
                const array = String(value).split(',')[1].split('-')
                return {start: array[0], end: array[1]}
            }
            default: {
                break
            }
        }
    }

    const onClick = (value) => {
        if (value.hours !== null) {
            const data = {...value}
            const openingDay = formatOption('day', data.hours)
            const openingHour = formatOption('time', data.hours)
            delete data.category
            setDescForm({
                ...data,
                type: 'Update',
                startDay: openingDay.start.trim(), 
                endDay: openingDay.end.trim(), 
                startTime: openingHour.start.trim(), 
                endTime: openingHour.end.trim()
            })
        }
        setShow({
            ...show,
            updateDescription: true
        })
    }

    const deleteRestaurant = (value) => {
        if(!(value._id === 0)) {
            axios.delete('http://localhost:5000/restaurants/'+value._id)
            .then(res => {
                Swal.fire({
                    icon: res.data[0].msg.type,
                    title: res.data[0].msg.main,
                    text: res.data[0].msg.sub,
                    timerProgressBar: true,
                    timer: 1000,
                    showConfirmButton: false
                }).then((result)=> {
                    if (result.dismiss) {
                        window.location = '/restaurants'
                    }
                })
            })
        }
    }

    return (
        <React.Fragment>
            {description.map((value, key)=> {
                return (
                    <React.Fragment>
                        <div className="flex-parent">
                            <img alt="" src={value.imageURL} />
                            <div className="flex-child">
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '18px'
                                }}>
                                    {value.name}
                                    {user.id === value.user_id ? 
                                    <div>
                                        <EditIcon
                                        style={{
                                            cursor: 'pointer',
                                            color:'#FC5296'
                                        }}
                                        onClick={() =>{
                                            onClick(value)
                                        }}
                                        />
                                        <DeleteIcon 
                                        style={{
                                            cursor: 'pointer',
                                            color: '#FC5296'
                                        }}
                                        onClick={() => {
                                            deleteRestaurant(value)
                                        }}
                                        />

                                    </div>:null
                                    }    
                                </div>
                                <div style={{
                                    fontSize: '13px'
                                    }}
                                >
                                    <span className='tags'>Address:</span>
                                    {value.address}
                                </div>
                                <div style={{
                                    fontSize: '13px'
                                    }}
                                >
                                    <span className='tags'>Opening Hours:</span>
                                    {value.hours}
                                </div>
                                <div style={{
                                    fontSize: '13px'
                                    }}
                                >
                                    <span className='tags'>Category:</span>
                                    {value.category}
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    lineHeight: '1.7'
                                    }}
                                >
                                    <span className='tags'>Description:</span>
                                    {value.description}
                                </div>
                            </div>
                        </div>  
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}

export default Description;