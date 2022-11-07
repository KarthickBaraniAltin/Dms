import axios from 'axios';
import { updateReimbursementDate } from '../../../../api/apiCalls';

export default async function handler(req, res) {
    const { method, body, headers } = req

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method == 'POST') {
        try {
            const result = await updateReimbursementDate(body)
            res.json({success: "true"})
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    }  else {
        res.setHeader('Allow', ['POST']);
    }
}

