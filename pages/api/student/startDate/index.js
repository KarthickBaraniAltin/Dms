import axios from 'axios';
import { putStartDateStudent } from "../../../../api/apiCalls";

export default async function handler(req, res) {
    const { method, body } = req;
    
    const headers = req.headers;

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method === 'POST') {
        try {
            const updateResult = await putStartDateStudent(body);
            res.json({'result': 'success'});
        } catch (error) {
            console.log(error)
            res.status(400).end('Internal Error');
        }
    } else {
        res.setHeader('Allow', ['POST']);
    }
}
