import axios from 'axios'

function getCategory(setState, setCategoryForm, id) {
    axios.get(`http://localhost:5000/categories/${id}`)
        .then(res => {
            setCategoryForm({
                _id: res.data[0][0]._id,
                category: res.data[0][0].category,
                imageURL: res.data[0][0].imageURL,
                type: { action: 'update', button: 'Update', title: 'Update' }
            })
            setState(res.data[1])
        })
}

function deleteCategory(id) {
    axios.delete(`http://localhost:5000/categories/${id}`)
        .then(res => {
            window.location.replace('http://localhost:3000/categories/')
        })
}

function handleSubmit(e, categoryForm, user, setState, setShow, show) {
    e.preventDefault()
    const data = { ...categoryForm }
    delete data.type
    switch (categoryForm.type.action) {
        case 'new': {
            newCategory({
                ...data,
                user_id: user.id
            }, setState)
            break
        }
        case 'update': {
            updateCategory({
                ...data
            }, setState)
            break
        }
        default: {
            break
        }
    }
    setShow({
        ...show,
        updateCategory: false
    })
}

const updateCategory = (value) => {
    var id = value._id
    delete value._id
    axios.put(`http://localhost:5000/categories/${id}`, value)
        .then(res => {
            console.log(res.data)
        })
}

const newCategory = (value, setState) => {
    delete value._id
    axios.post(`http://localhost:5000/categories/`, value)
        .then(res => {
            setState(res.data)
        })
}

export {
    getCategory,
    handleSubmit,
    deleteCategory
}