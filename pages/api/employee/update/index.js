import { putEmployee } from "../../../../api/apiCalls";
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
            const result = await putEmployee(body)
            res.json({ ...result.data })
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                res.status(405).json({ error: error.response.data.message })
            } else if (error.response && error.response.data && error.response.data.errors) {
                res.status(405).json({ errors: error.response.data.errors })
            } 
            else {
                res.status(405).json({ result: "Unknown error" })
            }
            console.error(error)
        }
    } else {
        res.setHeader('Allow', ['POST'])
    }
}

