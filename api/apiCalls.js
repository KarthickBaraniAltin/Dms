import axios from 'axios'
import https from 'https'

const activeDirectoryApi = process.env.ACTIVE_DIRECTORY_API
const formBuilderStudioApi = process.env.FORM_BUILDER_API


axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false });
    
    
export const getUsersFiltered = (filterString) => {
    return axios.get(`${activeDirectoryApi}/User/filter?FilterString=${filterString}`)
}

export const getFormDefinitions = (rows) => {
    return axios.get(`${formBuilderStudioApi}/FormDefinition/filter?Rows=${rows}`)
}