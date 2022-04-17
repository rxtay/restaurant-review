import React, { useState } from "react";
import { useContext, useEffect } from "react";
import AppContext from "../../../context/AppContext";
// import { getAllCategories } from "../../../api/categories/CategoriesAPI";
import { Modal } from "react-bootstrap";
import { handleSubmit } from "../../../api/restaurantInfo/DescriptionAPI";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const DescriptionForm = ({setState}) => {
    const {show, descForm, setDescForm, user, setShow} = useContext(AppContext);
    const [openingHours, setOpeningHours] = useState({days: [], time: []})

    useEffect(()=> {
        setOpeningHours({time: formatConstants('time', []), days: formatConstants('days', null)})
    }, [])

    const formatConstants = (method, output) => {
        switch (method) {
            case 'time': {
                for (let i =0; i < 24; i++) {
                    output.push(i+':00')
                }
                return output
            }
            case 'days': {
                return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
            default:{
                break
            }
        }
    }

    const onSubmit = (e) => {
        if (show.updateDescription) {
            handleSubmit(e, descForm, user, setState, setShow, show)
        }
    }

    //On change events for description
    const onChangeDescription = event => {
        setDescForm({
            ...descForm,
            [event.target.name]: event.target.value
        })
    }

    const handleCancel = () => {
        setShow({
            ...show,
            updateDescription: false
        })
    }

    return (
        <Modal show={show.updateDescription}>
            <Modal.Header style={{
                fontFamily:'Poppins',
                display:'flex',
                justifyContent:'center',
                fontSize: '18px'
            }}>
            {descForm.type} Description
            </Modal.Header>
            <Modal.Body>
                <div className="outer-container">
                    <form onSubmit={onSubmit}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <TextField
                            style={{
                                padding: '5px'
                            }}
                            variant="filled"
                            hiddenLabel
                            required
                            placeholder="Enter restaurant name..."
                            size="small"
                            name="name"
                            value={descForm.name}
                            onChange={onChangeDescription}
                            />
                            <TextField
                            style={{
                                padding: '5px'
                            }}
                            variant="filled"
                            hiddenLabel
                            required
                            placeholder="Enter the address..."
                            size="small"
                            name="address"
                            value={descForm.address}
                            onChange={onChangeDescription}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <FormControl 
                            variant="filled" 
                            fullWidth 
                            style={{
                                width: '50%',
                                padding: '5px'
                            }}>
                                <InputLabel id="start-day">Start (Day)</InputLabel>
                                <Select
                                required
                                labelId="start-day"
                                size="small"
                                name="startDay"
                                onChange={onChangeDescription}
                                value={descForm.startDay}
                                >
                                {openingHours.days.map((value, key)=> {
                                    return <MenuItem value={value}>{value}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                            <FormControl 
                            variant="filled" 
                            fullWidth 
                            style={{
                                width: '50%',
                                padding: '5px'
                            }}>
                                <InputLabel id="end-day">End (Day)</InputLabel>
                                <Select
                                required
                                labelId="end-day"
                                size="small"
                                name="endDay"
                                onChange={onChangeDescription}
                                value={descForm.endDay}
                                >
                                {openingHours.days.map((value, key)=> {
                                    return <MenuItem value={value}>{value}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <FormControl 
                            variant="filled" 
                            fullWidth 
                            style={{
                                width: '50%',
                                padding: '5px'
                            }}>
                                <InputLabel id="start-time">Start (Time)</InputLabel>
                                <Select
                                required
                                labelId="start-time"
                                size="small"
                                name="startTime"
                                value={descForm.startTime}
                                onChange={onChangeDescription}
                                >
                                {openingHours.time.map((value, key)=> {
                                    return <MenuItem value={value}>{value}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                            <FormControl 
                            variant="filled" 
                            fullWidth 
                            style={{
                                width: '50%',
                                padding: '5px'
                            }}>
                                <InputLabel id="end-time">End (Time)</InputLabel>
                                <Select
                                required
                                labelId="end-time"
                                size="small"
                                name="endTime"
                                onChange={onChangeDescription}
                                value={descForm.endTime}
                                >
                                {openingHours.time.map((value, key)=> {
                                    return <MenuItem value={value}>{value}</MenuItem>
                                })}
                                </Select>

                            </FormControl>
                        </div>
                        <div style={{
                            display: 'flex'
                        }}>
                            <TextField
                            style={{
                                padding: '5px'
                            }}
                            required
                            fullWidth
                            variant="filled"
                            hiddenLabel
                            placeholder="Enter image source..."
                            size="small"
                            name="imageURL"
                            value={descForm.imageURL}
                            onChange={onChangeDescription}
                            />
                        </div>
                        <div>
                            <TextField
                            variant="filled"
                            required
                            fullWidth
                            minRows={4}
                            multiline
                            hiddenLabel
                            placeholder="Enter the description..."
                            style={{
                                padding: '5px'
                            }}
                            name="description"
                            minLength="100"
                            maxLength="1024"
                            value={descForm.description}
                            onChange={onChangeDescription}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent:'flex-end',
                            marginTop: '10px'
                        }}>
                            <Button
                            variant="contained"
                            onClick={handleCancel}
                            size='small'
                            style={{
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
                            >{descForm.type}</Button>
                        </div>
                    </form>   
                </div>
            </Modal.Body>
        </Modal>
    )}

export default DescriptionForm;