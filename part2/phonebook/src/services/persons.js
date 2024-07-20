import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response=> response.data)

    // return axios.post(baseUrl, newObject)
}

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deleteP = (id) => {
   return axios.delete(baseUrl + '/' + id)
}

const update = (id, newObject) =>{
    return axios.put(baseUrl+'/'+ id, newObject)
}

export default{
    getAll,
    create,
    deleteP,
    update
}