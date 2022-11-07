import axios from 'axios';
import { getInvoice } from '../../../../../api/apiCalls';

export default async function handler(req, res) {
    const { method, body, headers } = req
    const { id } = JSON.parse(body)

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method === 'POST') {
        try {
            const result = await getInvoice(id)
            res.status(200).json({ ...result.data} )
        } catch (error) {
            console.error(error)
            res.status(404).end(`Internal Error`)
        }
    } else {
        res.setHeader('Allow', ['POST'])
    }
}

