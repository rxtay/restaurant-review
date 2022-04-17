import axios from "axios";
import Swal from "sweetalert2";

function submitUser(user, history, event) {
    event.preventDefault()
    axios.post(`http://localhost:5000/users/`, user)
        .then(res => {
            Swal.fire({
                icon: res.data[0].msg.type,
                title: res.data[0].msg.main,
                text: res.data[0].msg.sub,
                timerProgressBar: true,
                timer: 1500,
                showConfirmButton: false
            }).then((result) => {
                if (result.dismiss) {
                    history.push('/')
                }
            })
        })
        .catch(err => {
            Swal.fire({
                icon: err.response.data[0].msg.type,
                text: err.response.data[0].msg.sub,
                timerProgressBar: true,
                timer: 1500,
                showConfirmButton: false
            })
        })
}

export {
    submitUser
}