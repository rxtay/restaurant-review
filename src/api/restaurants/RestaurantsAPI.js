import axios from 'axios'

function getAllRestaurants(setRestaurants, setCheck) {
    return axios.get('http://localhost:5000/restaurants/')
        .then(res => {
            setRestaurants(res.data)
            setCheck(0)
        })
}

export {
    getAllRestaurants
}