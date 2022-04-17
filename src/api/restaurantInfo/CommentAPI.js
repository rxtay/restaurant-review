import axios from 'axios'

function handleSubmit(e, comment, user, setState, setShow, show) {
    e.preventDefault()
    const data = { ...comment }
    delete data.username
    delete data.type

    switch (comment.type.action) {
        case 'update': {
            updateComment({
                ...data,
            }, setState)
            break;
        }
        case 'new': {
            newComment({
                ...data,
                user_id: user.id
            }, setState)
            break
        }
        default: {
            break
        }
    }
    setShow({
        ...show,
        updateComment: false
    })
}

function newComment(value, setState) {
    delete value._id
    axios.post(`http://localhost:5000/comments/`, value)
        .then(res => {
            setState(res.data)
        })
}

function updateComment(value, setState) {
    var id = value._id
    delete value._id
    axios.put(`http://localhost:5000/comments/${id}/`, value)
        .then(res => {
            setState(res.data)
        })
}

export {
    handleSubmit
}