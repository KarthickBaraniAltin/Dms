import axios from "axios";
import { getFormDatas, postFormData } from "../../../../api/apiCalls";
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

export default async function handler(req, res) {
    const { method, query, body, headers } = req
    const { id } = query

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method === 'GET') {
        try {
            const result = await getFormDatas()
            res.status(200).json(result.data)
        } catch (error) {
            console.log(error)
            res.status(405).json({result: 'Internal Error'})
        }
    } else if (method === 'POST') {
        try {

            const fetchParams = {
                method: 'POST',
                headers: {
                    'Authorization': `${headers.authorization}`,
                }, 
                body: body,
                agent: httpsAgent
            }

            const response = await fetch(`https://localhost:7262/api/FormData/${id}`, fetchParams)
            const resBody = await response.json()
            console.log("Res = ", resBody)
            res.status(200).json({result: "Success"})
        } catch (error) {
            console.log(error)
            res.status(405).json({result: 'Internal Error'})
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
    }
}