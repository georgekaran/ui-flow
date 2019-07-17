import axios from 'axios'

class Api {
    constructor({ url }) {
        this.url = url
        this.endpoints = {}
    }

    createEntity(entity) {
        this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
    }

    createEntities(entities) {
        entities.forEach(this.createBasicCRUDEndpoints.bind(this))
    }

    createBasicCRUDEndpoints({ name }) {
        let endpoints = {}
        const resourceURL = `${this.url}/${name}`
        console.log(resourceURL)
        endpoints.getAll = ({ query} = {}) => axios.get(resourceURL, { params: { query } })
        endpoints.getOne = ({ _id }) => axios.get(`${resourceURL}/${_id}`)
        endpoints.create = (values) => axios.post(resourceURL, values)
        endpoints.update = (newValues) => axios.put(`${resourceURL}/${newValues._id}`, newValues)
        endpoints.delete = ({ _id }) => axios.delete(`${resourceURL}/${_id}`)

        return endpoints
    }
}

export default Api