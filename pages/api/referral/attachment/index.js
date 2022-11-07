import axios from "axios"
import stream from 'stream';
import { promisify } from 'util';

const https = require('https');
const pipeline = promisify(stream.pipeline);

export default async function handler(req, res) {
    const { method, body, headers } = req
    const { id } = JSON.parse(body)

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method == 'POST') {
        try {
            
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            })

            const response = await fetch(`https://connect2.csn.edu/snap/api/referral/${encodeURIComponent(id)}/attachments` , {
                method: 'GET',
                headers: {
                    "Authorization": `${headers.authorization}`,
                    "Content-Type": 'application/octet-stream'
                },
                agent: httpsAgent
            })
            res.setHeader('Content-Type', 'application/zip')
            res.setHeader('Content-Disposition', `attachment; filename=Referral Receipts.zip`)
            await pipeline(response.body, res)            
        } catch (error) {
            console.log("Error = ", error)
            res.status(405).end(`Internal Error`)
        }
    } else {
        res.setHeader('Allow', ['POST'])
    }
}
    
