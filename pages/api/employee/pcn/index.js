import axios from "axios";
import { checkPcnNumber } from "../../../../api/apiCalls";

export default async function handler(req, res) {
    const { method, body, headers } = req;
    
    const { pcnNumber } = body

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    console.log("PcnNumber:", pcnNumber)

    if (method == 'POST') {
        try {
            const pcnResult = await checkPcnNumber(encodeURIComponent(pcnNumber))
            console.log(pcnResult.data)
            if (pcnResult.data.statusCode == 200) {
                res.json({ result: 'valid' });
            } else {
                res.json({ result: 'invalid' });
            }
        } catch (error) {
            console.log(error);
            res.json({ result: 'invalid' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
    }
}

