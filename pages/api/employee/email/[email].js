import axios from "axios";
import { getEmployeeWithEmail } from "../../../../api/apiCalls";

export default async function handler(req, res) {
    const { method } = req;
    
    const { email } = req.query;

    console.log("--------------------->");
    const headers = req.headers;

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method == 'GET') {
        try {
            const employee = await getEmployeeWithEmail(email);
            res.json({...employee.data, method: 'GET', endpoint: 'Employees'});
        } catch (error) {
            res.status(405).end(`Internal Error`);
        }
    } else {
        res.setHeader('Allow', ['GET']);
    }
}

