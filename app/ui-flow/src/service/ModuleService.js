import Api from './Api'

const newApi = new Api({ url: 'http://localhost:5000' })
newApi.createEntity({ name: 'module' })

const ModuleApi = newApi.endpoints.module

export default ModuleApi