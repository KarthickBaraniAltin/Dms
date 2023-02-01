import axios from 'axios'
import https from 'https'

const graphApi = "https://graph.microsoft.com/v1.0"
const activeDirectoryApi = process.env.ACTIVE_DIRECTORY_API
const formBuilderStudioApi = process.env.FORM_BUILDER_API

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false });
    
export const getUsersFiltered = (filterString) => {
    return axios.get(`${activeDirectoryApi}/User/filter?FilterString=${filterString}`)
}

export const postFormDefinition = (formDefinition) => {
    return axios.post(`${formBuilderStudioApi}/Form/Definition`, formDefinition)
}

export const getFormDefinition = (id) => {
    return axios.get(`${formBuilderStudioApi}/Form/Definition/${id}`)
}

export const getFormDefinitions = () => {
    return axios.get(`${formBuilderStudioApi}/Form/Definition`)
}

export const postFormData = (body) => {
    return axios.post(`${formBuilderStudioApi}/Form/Data`, body)
}

export const getFormDatas = () => {
    return axios.get(`${formBuilderStudioApi}/Form/Data`)
}

export const getFormData = (id) => {
    return axios.get(`${formBuilderStudioApi}/Form/Data/${id}`)
}