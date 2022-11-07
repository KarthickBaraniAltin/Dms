import { getStudentApplications } from "../../../api/apiCalls";
import axios from 'axios';

export default async function handler(req, res) {
    const { method, body, headers } = req

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method === 'POST') {
        try {
            const result = await getStudentApplications(body)
            res.status(200).json({ 'studentForms': [...result.data.studentForms], 'count' : result.data.count } )
        } catch (error) {
            console.error(error)
            res.status(404).end(`Internal Error`)
        }
    } else {
        res.setHeader('Allow', ['POST', 'PUT'])
    }
}

