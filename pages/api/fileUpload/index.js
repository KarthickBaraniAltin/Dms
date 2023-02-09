import axios from "axios";

export default async function handler(req, res) {
    const { method, body, headers } = req
    console.log('body:', body)

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method === 'POST') {
        try {
            // res.status(200).json(result.data.users)
            console.log('method:', method)
        } catch (error) {
            console.log(error)
            res.status(405).json({result: 'Internal Error'})
        }
    } else {
        res.setHeader('Allow', ['POST']);
    }
}