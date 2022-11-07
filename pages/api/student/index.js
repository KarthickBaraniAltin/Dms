import { getStudents, postStudent } from "../../../api/apiCalls";
import axios from 'axios';

export default async function handler(req, res) {
    const { method, body } = req;
    
    const headers = req.headers;

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method == 'GET') {
        try {
            const students = await getStudents();
            res.json({...students.data, method: 'GET', endpoint: 'student'});
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    } else if (method === 'POST') {
        try {
            const id = await postStudent(body);
            res.json({...id.data});
        } catch (error) {
            if (error.response.statusText === 'Unauthorized') {
                res.status(401).end('Unauthorized');
            } else {
                console.log("id = ", error.response.data.id)
                res.json({ status: 400, id: error.response.data.id});
            }
        }
    } else if (method === 'PUT') {

    } else if (method === 'DELETE') {

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
    }
}
