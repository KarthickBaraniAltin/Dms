import axios from "axios";

export default async function handler(req, res) {
    const { method, body } = req;
    
    const headers = req.headers;

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    res.json({name: "success", method: 'GET', endpoint: 'Employee/email'}); 
}

