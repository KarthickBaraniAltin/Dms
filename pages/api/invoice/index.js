import stream from 'stream';
import { promisify } from 'util';
import axios from 'axios';

const https = require('https');
const pipeline = promisify(stream.pipeline);

export default async function handler(req, res) {
    const { method, body } = req;
    const { year, month } = JSON.parse(body);

    const headers = req.headers;

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

            const response = await fetch(`https://connect2.csn.edu/snap/api/file/invoice/excel?month=${month}&year=${year}` , {
                method: 'GET',
                headers: {
                    "Authorization": `${headers.authorization}`,
                    "Content-Type": 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                agent: httpsAgent
            })
            console.log(response);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=SNAP Invoice1.xlsx');
            await pipeline(response.body, res)
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    }  else {
        res.setHeader('Allow', ['POST']);
    }
}

