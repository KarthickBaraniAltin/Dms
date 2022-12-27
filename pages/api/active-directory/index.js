import axios from "axios";
import { getUsersFiltered } from "../../../api/apiCalls";

export default async function handler(req, res) {
    const { method, body, headers } = req
    const { filterString } = body

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization;
    } else {
        delete axios.defaults.headers['Authorization'];
    }

    if (method === 'POST') {
        try {
            const result = await getUsersFiltered(filterString)
            res.status(200).json(result.data.users)
        } catch (error) {
            console.log(error)
            res.status(405).json({result: 'Internal Error'})
        }
    } else {
        res.setHeader('Allow', ['POST']);
    }
}