import axios from 'axios'
import https from 'https'

const api = "https://connect2.csn.edu/snap/api"
const studentApi = "https://connect2.csn.edu/snap-student/api"
const graphApi = "https://graph.microsoft.com/v1.0"
const activeDirectoryApi = process.env.ACTIVE_DIRECTORY_API


axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false });
    
    
export const getUsersFiltered = (filterString) => {
    return axios.get(`${activeDirectoryApi}/User/filter?FilterString=${filterString}`)
}