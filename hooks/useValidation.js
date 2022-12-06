import { useState } from "react"

export const useValidation = ({ metadata }) => {
    const [validations, setValidations] = useState({})
    const [errors, setErrors] = useState({})
    
    const validate = () => {
        let valid = true        
        const newErrors = {}

        metadata.forEach(element => {
            const { validations } = element

            console.log('Validations = ', validations)
        })

        console.log('Metadata ', metadata)
    }

    return { validate, errors }
}