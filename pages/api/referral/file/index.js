import stream from 'stream';
import { promisify } from 'util';
import axios from 'axios';

const https = require('https');
const pipeline = promisify(stream.pipeline);

export default async function handler(req, res) {
    const { method, body, headers } = req

    const { type, name, blobName, id } = body

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method == 'POST') {
        try {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });

            const response = await fetch(`https://connect2.csn.edu/snap/api/referral/file?id=${encodeURI(id)}&fileName=${encodeURI(name)}&fileType=${encodeURI(type)}` , {
                method: 'GET',
                headers: {
                    "Authorization": `${headers.authorization}`,
                    "Content-Type": 'application/pdf'
                },
                agent: httpsAgent
            })
            res.setHeader('Content-Type', type);
            res.setHeader('Content-Disposition', `inline; filename="${name}"`);
            await pipeline(response.body, res)
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    }  else {
        res.setHeader('Allow', ['POST']);
    }
}

