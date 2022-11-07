import { getReferrals, postReferral } from "../../../api/apiCalls";
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
            const referrals = await getReferrals();
            res.json({...referrals.data, method: 'GET', endpoint: 'referral'});
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    } else if (method === 'POST') {
        try {
            const id = await postReferral(body);
            res.json({...id.data});
        } catch (error) {
            console.log(error);
            res.status(405).end('Internal Error');
        }
    } else if (method === 'PUT') {

    } else if (method === 'DELETE') {

    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    }
}

