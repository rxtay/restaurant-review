import axios from 'axios'

function handleSubmit(event, value, user, setState, setShow, show) {
    event.preventDefault()
    // Clone the object
    const obj = {...value}
    var hours = `${obj.startDay}-${obj.endDay}, ${obj.startTime}-${obj.endTime}`.trim()
    delete obj.startDay
    delete obj.endDay
    delete obj.startTime
    delete obj.endTime
    delete obj.type

    switch (value.type) {
        case 'Update': {
            updateDescription({
                ...obj,
                hours: hours
            }, setState)
            break;
        }
        case 'Submit' : {
            submitDescription({
                ...obj,
                hours: hours,
                user_id: user.id
            }, setState, setShow, show)
            break;
        }
        default: {
            break
        }
    }

    setShow({
        ...show,
        updateDescription: false
    })
}

function submitDescription(value, setState) {
    delete value._id
    axios.post('http://localhost:5000/restaurants/', value)
    .then(res =>{
        setState(res.data)
    })
}

function updateDescription(value, setState) {
    var id = value._id
    delete value._id
    axios.put('http://localhost:5000/restaurants/' + id, value)
    .then(res =>{
        setState(res.data)
    })  
}

export {
    handleSubmit
}