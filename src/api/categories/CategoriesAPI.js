import axios from 'axios'

function getAllCategories(setValue) {
    axios.get('http://localhost:5000/categories/')
    .then(res => {
        setValue(res.data)
    })
}

export {
    getAllCategories
}