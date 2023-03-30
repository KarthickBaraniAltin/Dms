import axios from 'axios'
import https from 'https'

const formBuilderStudioApi = process.env.FORM_BUILDER_API

console.log("API = ", formBuilderStudioApi)

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false });
    
export const postFormDefinition = (formDefinition) => {
    return  axios.post(`${formBuilderStudioApi}/FormDefinition`, formDefinition)
}

export const putFormDefinition = (formDefinition, id) => {
    return axios.put(`${formBuilderStudioApi}/FormDefinition/${id}`, formDefinition)
}

export const getFormDefinition = (id) => {
    return axios.get(`${formBuilderStudioApi}/FormDefinition/${id}`)
}

export const getFormDefinitions = (query) => {
    return axios.get(`${formBuilderStudioApi}/FormDefinition/Filter${query}`)
}

export const postFormData = (formDefinitionId, formData) => {
    return axios.post(`${formBuilderStudioApi}/FormData/${formDefinitionId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getFormDatas = () => {
    return axios.get(`${formBuilderStudioApi}/FormData`)
}

export const getFormData = (id) => {
    return axios.get(`${formBuilderStudioApi}/FormData/${id}`)
}

export const getFormDataFiltered = (formDefinitionId, query) => {
    return axios.get(`${formBuilderStudioApi}/FormData/formDefinition/${formDefinitionId}/filter${query}`)
}