import axios from 'axios';




const baseUrl = 'https://formworkflowbuilder.azurewebsites.net/api/'

export const axiosGet = (url) => {

  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }
  console.log('check', config)
  return axios.get(baseUrl + url, config)
}

export const axiosPost = (url, data) => {

  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }
  return axios.post(baseUrl + url, data, config)
}
export const axiosPatch = (url, data) => {

  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }
  return axios.patch(baseUrl + url, data, config)
}

export const axiosPut = (url, data) => {


  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }
  return axios.put(baseUrl + url, data, config)
}

export const axiosDelete = (url) => {


  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }
  return axios.delete(baseUrl + url, config)
}



