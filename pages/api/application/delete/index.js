import { deleteStudentApplication } from "../../../../api/apiCalls";
import axios from 'axios';

export default async function handler(req, res) {
    const { method, body, headers } = req
    const { id } = body 

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method === 'POST') {
        try {
            const result = await deleteStudentApplication(id)
            res.json({id: result.data})
        } catch (error) {
            console.log(error)
            res.status(405).end('Internal Error')
        }
    } else {
        res.setHeader('Allow', ['POST'])
    }
}