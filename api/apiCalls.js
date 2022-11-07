import axios from 'axios'
import https from 'https'

const api = "https://connect2.csn.edu/snap/api"
const studentApi = "https://connect2.csn.edu/snap-student/api"
const graphApi = "https://graph.microsoft.com/v1.0"


axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false });

export const postEmployee = (body) => {
    return axios.post(`${api}/employee`, body);
}

export const getEmployeeServices = () => {
    return axios.get(`${api}/employeeservice`);
}

export const deleteEmployee = (id) => {
    return axios.delete(`${api}/employee?id=${id}`);
}

export const getEmployees= () => {
    return axios.get(`${api}/employee`);
}

export const getEmployee = (id) => {
    return axios.get(`${api}/employee/id?id=${id}`)
}

export const getInvoiceExcel = (month) => {
    return axios.get(`${api}/file/invoice/excel?month=${month}`, {
        method: 'GET',
        //responseType: 'blob',
        headers: {'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    });
}

export const getStudent = (id) => {
    return axios.get(`${api}/student/id?id=${id}`)
}

export const getApplication = (id) => {
    return axios.get(`${studentApi}/SnapApplication/id?id=${id}`);
}

export const getStudentApplications = (body) => {
    body = JSON.parse(body)
    const { filters } = body

    let queryString = ''
    Object.keys(body).forEach(key => {
        if(body[key] && typeof body[key] != 'object') {
            queryString += key + '=' + body[key] + '&'
        }
    })

    if (!body.page) {
        queryString += `page=0&`
    }

    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key].value) {
                queryString += key + '=' + filters[key].value + '&'
            }  
        })
    }

    queryString = queryString.slice(0, -1)
    return axios.get(`${studentApi}/snapapplication/filter?${queryString}`)
}

export const getFilteredStudents = (body) => {
    body = JSON.parse(body)
    const { filters } = body

    let queryString = ''
    Object.keys(body).forEach(key => {
        if(body[key] && typeof body[key] != 'object') {
            queryString += key + '=' + body[key] + '&'
        }
    })

    if (!body.page) {
        queryString += `page=0&`
    }

    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key].value) {
                queryString += key + '=' + filters[key].value + '&'
            }  
        })
    }

    queryString = queryString.slice(0, -1)
    return axios.get(`${api}/student/filter?${queryString}`)
}

export const getFilteredEmployees = (body) => {
    body = JSON.parse(body)
    const { filters } = body

    let queryString = ''
    Object.keys(body).forEach(key => {
        if(body[key] && typeof body[key] != 'object') {
            queryString += key + '=' + body[key] + '&'
        }
    })

    if (!body.page) {
        queryString += `page=0&`
    }

    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key].value) {
                queryString += key + '=' + filters[key].value + '&'
            }  
        })
    }

    queryString = queryString.slice(0, -1)
    return axios.get(`${api}/employee/filter?${queryString}`)
}

export const getFilteredReferrals = (body) => {
    body = JSON.parse(body)
    const { filters } = body

    let queryString = ''
    Object.keys(body).forEach(key => {
        if(body[key] && typeof body[key] != 'object') {
            queryString += key + '=' + body[key] + '&'
        }
    })

    if (!body.page) {
        queryString += `page=0&`
    }

    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key].value) {
                queryString += key + '=' + filters[key].value + '&'
            }  
        })
    }

    queryString = queryString.slice(0, -1)
    return axios.get(`${api}/referral/filter?${queryString}`)
}

export const validateNsheId = (body) => {
    const { nsheId, firstName, lastName } = body
    return axios.get(`${studentApi}/snapApplication/validateNsheId?nsheId=${encodeURIComponent(nsheId)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`)
}

export const getInvoices = () => {
    return axios.get(`${api}/file/invoice`)
}

export const getInvoice = (id) => {
    return axios.get(`${api}/file/invoice/${id}`)
}

export const deleteStudentApplication = (id) => {
    return axios.delete(`${studentApi}/snapapplication?id=${id}`)
}

export const putStudentApplication = (body) => {
    return axios.put(`${studentApi}/snapapplication`, body)
}

export const getIdTypes = () => {
    return axios.get(`${api}/idtype`)
}

export const getPcns = () => {
    return axios.get(`${api}/pcn`)
}

export const getStudentServices = () => {
    return axios.get(`${api}/studentservice`)
}

export const getEnrollmentStatuses = () => {
    return axios.get(`${api}/enrollmentstatus`)
}

export const sendInvoiceToState = (body) => {
    return axios.put(`${api}/file/invoice/sendToState`, body)
}

export const uploadReturnedInvoice = (body) => {
    return axios.put(`${api}/file/invoice/returnedFromState`, body)
}

export const updateReimbursementDate = (body) => {
    return axios.put(`${api}/file/invoice/reimbursementDate`, body)
}

export const putEmployee = (body) => {
    return axios.put(`${api}/employee`, body)
}

export const postStudent = (body) => {
    return axios.post(`${api}/student`, body)
}

export const getStudents = () => {
    return axios.get(`${api}/student`)
}

export const putStudent = (body) => {
    return axios.put(`${api}/student`, body)
}

export const deleteStudent = (id) => {
    return axios.delete(`${api}/student?id=${id}`)
}

export const putStartDateStudent = (body) => {
    return axios.put(`${api}/student/startdate`, body)
}

export const postReferral = (body) => {
    return axios.post(`${api}/referral`, body)
}

export const putReferral = (body) => {
    return axios.put(`${api}/referral`, body)
}

export const getReferrals = () => {
    return axios.get(`${api}/referral`)
}

export const getFringes = () => {
    return axios.get(`${api}/fringe`)
}

export const getFringe = (id) => {
    return axios.get(`${api}/fringe/${id}`)
}

export const postFringe = (body) => {
    return axios.post(`${api}/fringe`, body)
}

export const putFringe = (body) => {
    return axios.put(`${api}/fringe`, body)
}

export const deleteFringe = (id) => {
    return axios.delete(`${api}/fringe/${id}`)
}

export const putApprovedBudget = (body) => {
    return axios.put(`${api}/approvedBudget`, body)
}

export const getApprovedBudget = (id) => {
    return axios.get(`${api}/approvedBudget/${id}`)
}

export const getApprovedBudgets = () => {
    return axios.get(`${api}/approvedBudget`)
}

export const postApprovedBudget = (body) => {
    return axios.post(`${api}/approvedBudget`, body)
}

export const deleteApprovedBudget = (id) => {
    return axios.delete(`${api}/approvedBudget/${id}`)
}

export const getReferral = (id) => {
    return axios.get(`${api}/referral/id?id=${id}`)
}

export const deleteReferral = (id) => {
    return axios.delete(`${api}/referral?id=${id}`)
}

export const getDesignations = () => {
    return axios.get(`${api}/designation`)
}

export const postValidationData = (data) => {
    return axios.post(`${api}/validation`, data)
}

export const getAllStudentGroupMembers = () => {
    let config = {
        headers: {
            consistencylevel: 'eventual'
        }
    }
    // const graph = `${graphApi}/groups/a13ddc46-19e4-4b19-8ecd-8d150a0bd1c1/members?$select=id,displayName,mail,givenName,surname`;
    const graph = `${graphApi}/groups/a13ddc46-19e4-4b19-8ecd-8d150a0bd1c1/members?$select=id,displayName,mail,givenName,surname&$search="displayName:ahmet"`;
    return axios.get(graph, config)
}

export const getStudentMembersStartingWith = (startsWith) => {
    let config = {
        headers: {
            consistencylevel: 'eventual'
        }
    }
    const graph = `${graphApi}/groups/a13ddc46-19e4-4b19-8ecd-8d150a0bd1c1/members?$select=id,displayName,mail,givenName,surname&$count=true&$filter=startswith(displayName,'${startsWith}')`;
    return axios.get(graph, config)
}

export const getEmployeeMembersStartingWith = (startsWith) => {
    let config = {
        headers: {
            consistencylevel: 'eventual'
        }
    }
    const graph = `${graphApi}/groups/779b13ae-a7f9-4db6-be1b-ff94cdfa99ea/members?$select=id,displayName,mail,givenName,surname&$count=true&$filter=startswith(displayName,'${startsWith}')`;
    return axios.get(graph, config)
}

export const getEmployeesContainingNameFromDatabase = (name) => {
    const apiEndpoint = `${api}/employee/find?name=${name}`;
    return axios.get(apiEndpoint)
}

export const getStudentsContainingNameFromDatabase = (name) => {
    const apiEndpoint = `${api}/student/find?name=${name}`
    return axios.get(apiEndpoint)
}

export const getEmployeeWithEmail = (email) => {
    return axios.get(`${api}/employee/email?email=${email}`)
}

export const getStudentWithEmail = (email) => {
    return axios.get(`${api}/student/email?email=${email}`)
}

export const checkPcnNumber = (pcnNumber) => {
    return axios.get(`${api}/employee/pcn?pcnNumber=${pcnNumber}`)
}

export const getStudentApplicationsFiltered = (bodyStr) => {
    const body = JSON.parse(bodyStr)
    return axios.get(`${studentApi}/snapapplication/referralStudents?email=${encodeURIComponent(body.email)}&idType=${encodeURIComponent(body.idType)}&idNumber=${encodeURIComponent(body.idNumber)}`)
}

export const setAuthorizationHeader = ( token ) => {
    const authorizationHeaderValue = `Bearer ${token}`
    axios.defaults.headers["Authorization"] = authorizationHeaderValue
}

export const deleteAuthorizationHeader = () => {
    delete axios.defaults.headers['Authorization']
}

export const getFundingDepartments = () => {
    return axios.get(`${api}/fundingDepartment`)
}

export const getEmployeeTypes = () => {
    return axios.get(`${api}/EmployeeType`)
}

export const getDepartments = () => {
    return axios.get(`${api}/department`)
}

export const getDepartment = (id) => {
    return axios.get(`${api}/department/${id}`)
}

export const getAllDepartments = () => {
    return axios.get(`${api}/department/all`)
}

export const postDepartment = (body) => {
    return axios.post(`${api}/department`, body)
}

export const putDepartment = (body) => {
    return axios.put(`${api}/department`, body)
}

export const deleteDeparment = (id) => {
    return axios.delete(`${api}/department/${id}`)
}
