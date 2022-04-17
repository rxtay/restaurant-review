import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router";
import axios from 'axios'
import AppContext from '../../context/AppContext';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Community = () => {
    const {id} = useParams() 
    const {user, authUser} = useContext(AppContext)
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [community, setCommunity] = useState([])

    // New comment, new post, edit comment, edit post
    const [newComment, setNewComment] = useState('')
    const [editCommunity, setEditCommunity] = useState('')
    const [newPost, setNewPost] = useState({
        title: '', 
        image: ''
    })
    
    const [comment, setComment] = useState({
        _id: 0, 
        comment:''
    })
    
    const [post, setPost] = useState({
        _id: 0, 
        title: '', 
        image: ''
    })
    
    //Edit comment, Show comments, Show options, Add new comment, Edit post
    const [toggleCommunity, setToggleCommunity] = useState(false)
    const [toggleEdit, setToggleEdit] = useState([])
    const [toggleComments, setToggleComments] = useState([])
    const [toggleOptions, setToggleOptions] = useState([])
    const [toggleNewComment, setToggleNewComment] = useState([])
    const [togglePost, setTogglePost] = useState([])
    const [toggleNewPost, setToggleNewPost] = useState(false)

    useEffect(()=> {
        authUser()

        async function getPosts() {
            axios.get(`http://localhost:5000/posts/${id}`, {withCredentials: true})
            .then(res=> {
                setPosts(res.data)
            })
        }

        async function getComments() {
            axios.get(`http://localhost:5000/community/comments/${id}`)
            .then(res=> {
                setComments(res.data)
            })
        }
        
        async function getCommunity() {
            axios.get(`http://localhost:5000/communities/${id}`)
            .then(res => {
                setCommunity(res.data[0])
            }) 
        }
        
        getCommunity()
        getPosts()
        getComments()
    }, [])

    const handleToggle = (value, state, setState) => {
        switch (true){
            case state.includes(value):{
                setState(state.filter(ele => ele !== value))
                break
            }
            default: {
                setState(state => [...state, value])
                break
            }
        }
    }

    const handleEditPost = (value, state, setState) => {
        switch (true) {
            case state.includes(value._id): {
                setPost({
                    _id:0,
                    title: '',
                    image: ''
                })
                setState(state.filter(ele => ele !== value._id))      
                break
            }
            default: {
                setPost({
                    _id: value._id,
                    title: value.title,
                    image: value.image
                })
                setState(state => [...state, value._id]) 
                break
            }
        }
    }

    const handleEditComment = (value, state, setState) => {
        switch (true) {
            case state.includes(`${value.post_id}-${value._id}`):{
                setComment({
                    _id: 0,
                    comment: ''
                })
                setState(state.filter(ele => ele !== `${value.post_id}-${value._id}`))
                break
            }
            default: {
                setComment({
                    _id: value._id,
                    comment: value.comment
                })
                setState(state => [...state, `${value.post_id}-${value._id}`])
            }
        }
    }

    const handleInput = (event) => {
        event.preventDefault()
        document.getElementById('file-input').click()
    }

    const handleFileChange = (e, state, setState) => {
        if (e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onloadend = () => {
                setState({
                    ...state, 
                    image:String(fileReader.result)
                })
            }
        }
    }

    const handleChange = (e, state, setState) => {
        setState({
            ...state, [e.target.name]:e.target.value
        })
    }

    const handleSubmitPost = (e, state, value) => {
        e.preventDefault()   
        axios.put(`http://localhost:5000/posts/${value.community_id}/`, state)
        .then(res => {
            setPosts(res.data)
            setTogglePost(togglePost.filter(ele => ele !== value._id))
        })
    }

    const handleSubmitComment = (e, state, value) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/community/comments/${value.community_id}/`, state)
        .then(res => {
            setComments(res.data)
            setToggleEdit(toggleEdit.filter(ele => ele !== `${value.post_id}-${value._id}`))
        })
    }

    const handleNewComment = (e, state, value) => {
        e.preventDefault()
        if (user.id !== 0) {
            const data = {
                comment: state,
                user_id: user.id,
                post_id: value._id,
                community_id: value.community_id
            }
            axios.post(`http://localhost:5000/community/comments/`,data)
            .then(res=> {
                setComments(res.data)
                setNewComment('')
                handleToggle(value._id, toggleNewComment, setToggleNewComment)
            })
        }
    }

    const handleNewPost = (e, state, value) => {
        e.preventDefault()
        if (user.id !== 0) {
            const data = {...state, user_id: user.id, community_id: id}
            axios.post(`http://localhost:5000/posts/`, data)
            .then(res => {
                setPosts(res.data)
                setToggleNewPost(!toggleNewPost)
                setNewPost({
                    image: '',
                    title: '',
                })
            })
        }
    }

    const handleDelete = (method, e, value) => {
        switch (method){
            case 'DELETE_COMMENT':{
                axios.delete(`http://localhost:5000/community/comments/${value.community_id}/${value._id}`)
                .then(res=> {
                    setComments(res.data)
                })
                break
            }
            case 'DELETE_POST':{
                axios.delete(`http://localhost:5000/posts/${value.community_id}/${value._id}`, {withCredentials: true})
                .then(res=> {
                    setPosts(res.data)
                })
                break
            }
            default:{
                break
            }
        }
    }

    const deleteCommunity = () => {
        axios.delete(`http://localhost:5000/communities/${id}`)
        .then(res => {
            window.location.replace("http://localhost:3000/communities")
        })
    }

    const updateCommunity = (state) => {
        const data = {
            name: state
        }
        axios.put(`http://localhost:5000/communities/${id}`, data)
        .then(res=> {
            setCommunity(res.data[0])
            setToggleCommunity(!toggleCommunity)
        })
    }

    const like = (value) => {
        axios.post(`http://localhost:5000/community/likes/${id}/${value._id}`, {withCredentials: true})
        .then(res => {
            setPosts(res.data)
        })
    }

    const unlike = (value) => {
        axios.delete(`http://localhost:5000/community/likes/${id}/${value._id}`, {withCredentials:true})
        .then(res => {
            setPosts(res.data)
        })
    }

    return (
        <React.Fragment>
            <section className="community">
                <div className="community-container">
                    <div className="community-heading">
                        {toggleCommunity ?
                        <React.Fragment>
                            <TextField
                            variant="filled"
                            fullWidth
                            hiddenLabel
                            placeholder="Give it a creative name!"
                            size="small"
                            value={editCommunity}
                            onChange={(e)=>{
                                setEditCommunity(e.target.value)
                            }}
                            />
                        </React.Fragment>
                        :<React.Fragment>
                            <h5>{community.name}</h5> 
                        </React.Fragment>}

                        <div style={{display: 'flex'}}>
                            {user.id === community.user_id ?
                            <EditIcon
                                onClick={()=>{
                                setEditCommunity(community.name)
                                setToggleCommunity(!toggleCommunity)
                                }}
                            /> 
                            :null}
                            {toggleCommunity ? 
                            <React.Fragment>
                                <SendIcon
                                onClick={()=> {
                                    updateCommunity(editCommunity)
                                }}
                                />
                            </React.Fragment>
                            :<React.Fragment>
                                {user.id === community.user_id ? 
                                <Delete 
                                onClick={() => {
                                    deleteCommunity()
                                }}
                                />
                                :null}
                                <AddCircleIcon
                                onClick={()=> {
                                    setNewPost({
                                        image: '',
                                        title: ''
                                    })
                                    setToggleNewPost(!toggleNewPost)
                                }}
                                />
                            </React.Fragment>}   
                        </div>
                    </div>
                    <div className="cards-container">
                        {toggleNewPost ?
                        <React.Fragment>
                            <div className="card">
                                <div className="info-container">
                                    <div className="info-edit">
                                        <TextField
                                            onChange={(e)=> {
                                                handleChange(e, newPost, setNewPost)
                                            }} 
                                            variant="filled"
                                            fullWidth
                                            hiddenLabel
                                            placeholder="Title"
                                            value={newPost.title}
                                            name="title"
                                        />
                                        <input
                                            onChange={(e)=> {
                                                handleFileChange(e, newPost, setNewPost)
                                            }}
                                            accept='image/*' 
                                            id="file-input" 
                                            type="file" 
                                            style={{ display: "none" }
                                        }
                                        />
                                        <Button
                                        onClick={(e)=> {
                                            handleInput(e)
                                        }}
                                        variant="contained"
                                        fullWidth>
                                            CHOOSE IMAGE
                                        </Button> 
                                        <img alt="" src={newPost.image} />
                                    </div>  
                                </div>
                                <div className="card-options-active">
                                    <SendIcon 
                                    fontSize="medium" 
                                    onClick={(e)=> {
                                        handleNewPost(e, newPost, user)
                                    }}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                        :null
                        }
                        {posts.map((value, key)=> {
                            return (
                                <div className="card">
                                    <div className="info-container">
                                        {!togglePost.includes(value._id) ? 
                                        <React.Fragment>
                                            <div className="card-heading">
                                                {value.title}
                                                <MoreVertIcon 
                                                fontSize="medium"
                                                onClick={()=> {
                                                    handleToggle(value._id, toggleOptions, setToggleOptions)
                                                }}/>
                                            </div>
                                            <div className="card-image">
                                                <img alt="" src={value.image}/>
                                            </div>
                                        </React.Fragment>
                                        :<React.Fragment>
                                            <div className="info-edit">
                                                <TextField
                                                    onChange={(e)=> {
                                                        handleChange(e, post, setPost)
                                                    }} 
                                                    variant="filled"
                                                    fullWidth
                                                    hiddenLabel
                                                    placeholder="Title"
                                                    value={post.title}
                                                    name="title"
                                                />
                                                <input
                                                    onChange={(e)=> {
                                                        handleFileChange(e, post, setPost)
                                                    }}
                                                    accept='image/*' 
                                                    id="file-input" 
                                                    type="file" 
                                                    style={{ display: "none" }
                                                }
                                                />
                                                <Button
                                                onClick={(e)=> {
                                                    handleInput(e)
                                                }}
                                                variant="contained"
                                                fullWidth>
                                                    CHOOSE IMAGE
                                                </Button> 
                                                <img alt="" src={post.image} />
                                            </div>
                                        </React.Fragment>
                                        }
                                        <div className="card-icon">
                                            <CommentIcon 
                                            onClick={() => {
                                                handleToggle(value._id, toggleComments, setToggleComments)
                                            }}/>
                                            {value.favorite !== null ?
                                            <div>
                                                <FavoriteIcon
                                                style={{
                                                    color: 'red'
                                                }}
                                                onClick={()=> {
                                                    unlike(value)
                                                }}
                                                />
                                            </div>
                                            :<div>
                                                <FavoriteIcon
                                                onClick={()=> {
                                                    like(value)
                                                }}
                                                />
                                            </div>}
                                        </div>
                                        {toggleNewComment.includes(value._id)?
                                            <div className="new-comment">
                                                <TextField 
                                                hiddenLabel
                                                variant="filled"
                                                fullWidth
                                                multiline
                                                placeholder="Write something..."   
                                                onChange={(e)=> {
                                                    setNewComment(e.target.value)
                                                }}
                                                value={newComment}
                                                />
                                                <div className="icon">
                                                    <SendIcon 
                                                    onClick={(e)=> {
                                                        handleNewComment(e, newComment, value)
                                                    }}
                                                    />
                                                </div>
                                            </div>:null
                                        }
                                        
                                        <div className="comments-container">
                                            {
                                            toggleComments.includes(value._id)?
                                            <div>
                                                {comments.filter(ele => ele.post_id === value._id).map((value, key)=> {
                                                    return (
                                                        <div>
                                                            {!toggleEdit.includes(`${value.post_id}-${value._id}`) ? 
                                                            <div className="card-comment">
                                                                <div className="comment-header">
                                                                    <h1>{value.username}</h1>
                                                                    {user.id === value.user_id ? 
                                                                    <div className="comment-icons">
                                                                        <EditIcon 
                                                                        fontSize="small"
                                                                        onClick={()=> {
                                                                            if (toggleEdit.length ===0) {
                                                                                handleEditComment(value, 
                                                                                toggleEdit, 
                                                                                setToggleEdit)
                                                                            }
                                                                        }}/>
                                                                        <Delete 
                                                                        fontSize="small"
                                                                        onClick={(e)=> {
                                                                            handleDelete('DELETE_COMMENT', e, value)
                                                                        }}/>
                                                                    </div>
                                                                    :null}
                                                                </div>
                                                                <h2>{value.comment}</h2>
                                                            </div>:
                                                            <div className="card-comment">
                                                                <div className="comment-header">
                                                                    <h1>{value.username}</h1>
                                                                    <div className="comment-icons">
                                                                        <CancelIcon 
                                                                        fontSize="small"
                                                                        onClick={()=> {
                                                                            handleToggle(`${value.post_id}-${value._id}`, 
                                                                            toggleEdit, 
                                                                            setToggleEdit)
                                                                        }}/>
                                                                        <SendIcon 
                                                                        fontSize="small"
                                                                        onClick={(e)=> {
                                                                            handleSubmitComment(e, comment, value)
                                                                        }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <TextField 
                                                                    hiddenLabel
                                                                    variant="filled"
                                                                    fullWidth
                                                                    multiline
                                                                    value={comment.comment}
                                                                    name="comment"
                                                                    onChange={(e)=> {
                                                                        handleChange(e, comment, setComment)
                                                                    }} 
                                                                />
                                                            </div>
                                                            }
                                                        </div>  
                                                    )
                                                })}
                                            </div>
                                            :null
                                            }  
                                        </div>
                                    </div>
                                    <div className={toggleOptions.includes(value._id) ? "card-options-active": "card-options"}>
                                        {!togglePost.includes(value._id) ?
                                        <React.Fragment>
                                            <AddCommentIcon 
                                            fontSize="medium" 
                                            onClick={()=> {
                                                handleToggle(value._id, toggleNewComment, setToggleNewComment)
                                            }}
                                            />
                                            {user.id === value.user_id ? 
                                            <React.Fragment>
                                                <EditIcon 
                                                fontSize="medium"
                                                onClick={()=> {
                                                    if (togglePost.length === 0){
                                                        handleEditPost(value, togglePost, setTogglePost)
                                                    }  
                                                }}/>
                                                <Delete 
                                                fontSize="medium"
                                                onClick={(e)=> {
                                                    handleDelete('DELETE_POST', e, value)
                                                }}
                                                />
                                            </React.Fragment>
                                            :null}
                                        </React.Fragment>:
                                        <React.Fragment>
                                            <CancelIcon 
                                            fontSize="small"
                                            onClick={()=> {
                                                handleToggle(value._id, 
                                                togglePost, 
                                                setTogglePost)
                                            }}/>
                                            <SendIcon 
                                            fontSize="small"
                                            onClick={(e)=> {
                                                handleSubmitPost(e, post, value)
                                            }}
                                            />
                                        </React.Fragment>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Community