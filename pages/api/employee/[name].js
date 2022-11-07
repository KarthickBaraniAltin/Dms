import axios from "axios";
import { getEmployeesContainingNameFromDatabase } from "../../../api/apiCalls";

export default async function handler(req, res) {
    const { method } = req;
    
    const { name } = req.query;

    const headers = req.headers;

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method == 'GET') {
        try {
            const employees = await getEmployeesContainingNameFromDatabase(name);
            res.json({...employees.data, method: 'GET', endpoint: 'Employees'});
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    } else {
        res.setHeader('Allow', ['GET']);
    }
}

