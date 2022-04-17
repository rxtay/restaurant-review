import React, {useState} from 'react'
import { Modal } from "react-bootstrap";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import axios from 'axios';

const CommunityModal = ({show, setShow, user, setData}) => {
    const [name, setName] = useState('')

    const onSubmit =(state) => {
        const data = {
            user_id: user.id,
            name: state
        }
        axios.post(`http://localhost:5000/communities`, data)
        .then(res => {
            setShow(!show)
            setData(res.data)
            setName('')
        })
    }

    const onCancel =() => {
        setName('')
        setShow(!show)
    }

    return (
        <React.Fragment>
            <Modal show={show}>
                <Modal.Header style={{
                    fontFamily:'Poppins',
                    display:'flex',
                    justifyContent:'center',
                    fontSize: '18px'
                }}>        
                New Community
                </Modal.Header>
                    
                <Modal.Body>
                    <div className="outer-container">
                        <div style={{
                            display:'flex',
                            justifyContent:'center'
                        }}>
                            <TextField
                            variant="filled"
                            hiddenLabel
                            placeholder="Give it a creative name!"
                            size="small"
                            value={name}
                            onChange={(e)=> {
                                setName(e.target.value)
                            }}
                            />    
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '10px'
                        }}>
                            <Button
                            variant="contained"
                            size='small'
                            style={{
                                background: '#202020'
                            }}
                            onClick={()=> {
                                onCancel()
                            }}
                            >
                            Cancel
                            </Button>
                            <Button
                            style={{
                                marginLeft: '10px',
                                background: '#202020'
                            }}
                            size= 'small'
                            variant="contained"
                            onClick={() => {
                                onSubmit(name)
                            }}
                            >Submit</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}
export default CommunityModal