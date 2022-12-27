import { useEffect, useState } from "react";
import { useAccount, useMsal } from "@azure/msal-react"
import axios from "axios";

export const useApi = () => {
    const [response, setResponse] = useState(undefined)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErros] = useState({})

    const callApi = async (params) => {
        if (loading) {
            return
        }

        try {
            setLoading(true)
            const result = await axios.request(params)
            const { data } = result

            if (data.statusCode == 400) {
                // set validation errors
                const errors = []
                data.value.errors.forEach(element => {
                    errors[element.propertyName] = [element.errorMessage]
                })
                setValidationErros(errors)
            } else {
                setValidationErros({})
                setResponse(result.data)
                return result
            }
        } catch (error) {
            setResponse({})
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    
    return { response, error, loading, validationErrors, callApi }
}
