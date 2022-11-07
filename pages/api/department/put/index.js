import axios from "axios"
import { putDepartment } from "../../../../api/apiCalls"

export default async function handler(req, res) {
    const { method, headers, body} = req

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method == 'POST') {
        try {
            const result = await putDepartment(body)
            res.json({ ...result.data })
        } catch (error) {
            console.log(error.response.data)
            if (error.response && error.response.data && error.response.data.message) {
                res.status(405).json({ error: error.response.data.message })
            } else {
                res.status(405).json({ result: "Unknown error" })
            }
        }
    } else {
        res.setHeader('Allow', ['POST'])
    }
}
    
