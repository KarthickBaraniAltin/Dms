import axios from "axios"
import { getDepartment } from "../../../../api/apiCalls"

export default async function handler(req, res) {
    const { method, headers, body} = req

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method == 'POST') {
        try {
            const result = await getDepartment(body.id)
            res.json({ ...result.data })
        } catch (error) {
            console.log("Error = ", error)
            res.status(405).end('Internal Error')
        }
    } else {
        res.setHeader('Allow', ['POST'])
    }
}
    
