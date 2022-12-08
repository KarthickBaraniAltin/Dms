import axios from 'axios'
import https from 'https'

const api = "https://connect2.csn.edu/snap/api"
const studentApi = "https://connect2.csn.edu/snap-student/api"
const graphApi = "https://graph.microsoft.com/v1.0"


axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false });

