import axios from 'axios';
import stream from 'stream';
import { promisify } from 'util';

const https = require('https');
const pipeline = promisify(stream.pipeline);

export default async function handler(req, res) {
    const { method, body, headers } = req
    const { id, fileExtension } = JSON.parse(body)

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method == 'POST') {
        try {

            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });

            const response = await fetch(`https://connect2.csn.edu/snap/api/file/invoice/excel/${encodeURIComponent(id)}/sendToState` , {
                method: 'GET',
                headers: {
                    "Authorization": `${headers.authorization}`,
                    "Content-Type": 'application/octet-stream'
                },
                agent: httpsAgent
            })

            if (fileExtension === 'pdf') {
                res.setHeader('Content-Type', 'application/pdf');
            } else if (fileExtension === 'xlsx') {
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            }
            res.setHeader('Content-Disposition', `attachment; filename=Invoice.${fileExtension}`);
            await pipeline(response.body, res)
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    }  else {
        res.setHeader('Allow', ['POST']);
    }
}

