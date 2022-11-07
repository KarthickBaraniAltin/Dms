import axios from 'axios';
import { getFilteredStudents } from "../../../../api/apiCalls";

export default async function handler(req, res) {
    const { method, body, headers } = req

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method === 'POST') {
        try {
            const result = await getFilteredStudents(body)
            res.status(200).json({ 'students': [...result.data.students], 'count' : result.data.count } )
        } catch (error) {
            console.error(error)
            res.status(404).end(`Internal Error`)
        }
    } else {
        res.setHeader('Allow', ['POST', 'PUT'])
    }
}

