import axios from "axios"
import { getApplication } from "../../../../api/apiCalls"

export default async function handler(req, res) {
    const { method, query } = req
    const { id } = query

    const headers = req.headers

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method == 'GET') {
        try {
            const application = await getApplication(id)
            res.json({ ...application.data })
        } catch (error) {
            console.log("Error = ", error)
            res.status(405).end(`Internal Error`)
        }
    } else {
        res.setHeader('Allow', ['GET'])
    }
}
    
