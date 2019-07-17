import Api from './Api'

class Service {
  static async post(url, data = {}) {
    return await Api.post(url, data).then(resp => {
      return resp.data
    }).catch(err => {
      console.log(err)
      return err;
    })
  }

  static async get(url, data) {
    return await Api.get(url, data).then(resp => {
      return resp.data
    }).catch(err => {
      console.log(err.response.data)
      return err;
    })
  }

  static async put(url, data = {}) {
    return await Api.put(url, data).then(resp => {
      return resp.data
    }).catch(err => {
      console.log(err.response.data)
      return err;
    })
  }

  static async delete(url, data = {}) {
    return await Api.delete(url, data).then(resp => {
      return resp.data
    }).catch(err => {
      console.log(err.response.data)
      return err;
    })
  }
}

export { Service };
