import { putStudent } from "../../../../api/apiCalls";
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
            const result = await putStudent(body)
            res.json({ ...result.data })
        } catch (error) {
            console.error(error)
            res.status(404).end('Internal Error')
        }
    } else {
        res.setHeader('Allow', ['POST'])
    }
}

