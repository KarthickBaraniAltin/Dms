import axios from "axios";
import { putFormDefinition, getFormDefinition } from "../../../../api/apiCalls"

export default async function handler(req, res) {
    const { method, query, body, headers } = req
    const { id } = query

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method === 'GET') {
        try {
            const result = await getFormDefinition(id)
            res.status(200).json(result.data)
        } catch (error) {
            console.log(error)
            res.status(405).json({result: 'Internal Error'})
        }
    } else if (method === 'PUT') {
        try {
            const result = await putFormDefinition(body, id)
            res.status(200).json(result.data)
        } catch (error) {
            console.log(error)
            res.status(405).json({result: 'Internal Error'})
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
    }
}