import axios from "axios";
import { getEmployees, postEmployee } from "../../../api/apiCalls";

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
            const departments = await getEmployees();
            res.json({...departments.data, method: 'GET', endpoint: 'Employees'});
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    } else if (method === 'POST') {
        try {
            const id = await postEmployee(body);
            res.json({...id.data});
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                res.status(405).json({ error: error.response.data.message })
            } else if (error.response && error.response.data && error.response.data.errors) {
                res.status(405).json({ errors: error.response.data.errors })
            } 
            else {
                res.status(405).json({ result: "Unknown error" })
            }
            console.log(error);
        }
    } else if (method === 'PUT') {

    } else if (method === 'DELETE') {

    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    }
}

