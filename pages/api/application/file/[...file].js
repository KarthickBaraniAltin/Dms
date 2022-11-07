import stream from 'stream';
import { promisify } from 'util';
import axios from 'axios';

const https = require('https');
const pipeline = promisify(stream.pipeline);

export default async function handler(req, res) {
    const { method, query, headers } = req;
    const { file } = query;

    const id = decodeURIComponent(file[0])
    const fileName = decodeURIComponent(file[1])

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method == 'GET') {
        try {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });

            const response = await fetch(`https://connect2.csn.edu/snap-student/api/snapapplication/${fileName}?id=${id}` , {
                method: 'GET',
                headers: {
                    "Authorization": `${headers.authorization}`,
                    "Content-Type": 'application/pdf'
                },
                agent: httpsAgent
            })
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename=${fileName}.pdf`);
            await pipeline(response.body, res)
        } catch (error) {
            console.log("Error = ", error);
            res.status(405).end(`Internal Error`);
        }
    }  else {
        res.setHeader('Allow', ['POST']);
    }
}

