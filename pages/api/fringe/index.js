import axios from "axios"
import { getFringes, postFringe } from "../../../api/apiCalls"

export default async function handler(req, res) {
    const { method, headers, body} = req

    if (headers.authorization) {
        axios.defaults.headers['Authorization'] = headers.authorization
    } else {
        delete axios.defaults.headers['Authorization']
    }

    if (method == 'GET') {
        try {
            const result = await getFringes()
            res.json({ ...result.data })
        } catch (error) {
            console.log("Error = ", error)
            res.status(405).end('Internal Error')
        }
    } else if (method == 'POST') {
        try {
            const result = await postFringe(body)
            res.json({result: 'success', data: { ...result.data }})
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                res.status(405).json({ error: error.response.data.message })
            } else {
                res.status(405).json({ result: "Unknown error" })
            }
        }
    } 
    else {
        res.setHeader('Allow', ['GET', 'POST'])
    }
}
    
