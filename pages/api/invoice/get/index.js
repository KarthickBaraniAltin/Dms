import axios from 'axios';
import { getInvoices } from '../../../../api/apiCalls';

export default async function handler(req, res) {
    const { method, headers } = req

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method === 'GET') {
        try {
            const result = await getInvoices()
            res.status(200).json({ ...result.data} )
        } catch (error) {
            console.error(error)
            res.status(404).end(`Internal Error`)
        }
    } else {
        res.setHeader('Allow', ['GET'])
    }
}

