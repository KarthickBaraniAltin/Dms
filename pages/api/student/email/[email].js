import axios from "axios";
import { getStudentWithEmail } from "../../../../api/apiCalls"; 

export default async function handler(req, res) {
    const { method } = req;
    
    const { email } = req.query;

    const headers = req.headers;

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method == 'GET') {
        try {
            const student = await getStudentWithEmail(email);
            res.json({...student.data, method: 'GET', endpoint: 'student/email', found: true});
        } catch (error) {
            console.log(error);
            res.status(405).end(`Internal Error`);
        }
    } else {
        res.setHeader('Allow', ['GET']);
    }
}

