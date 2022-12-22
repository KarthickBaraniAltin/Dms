import { useState, useEffect, useCallback } from "react"

export const useValidation = ({ metadata, inputs }) => {
    const [validations, setValidations] = useState({})
    const [errors, setErrors] = useState({})
    
    const validate = useCallback(() => {

        const validationMapper = {
            minLength: (minLength, currentLength) => {
                if (!minLength || !currentLength) {
                    return true
                }

                return minLength <= currentLength
            },
            maxLength: (maxLength, currentLength) => {
                if (!maxLength || !currentLength) {
                    return true
                }

                return maxLength >= currentLength
            },
            intBiggerThan: (value1, value2) => {
                return value1 > value2
            }
        }

        const errorMessages = {}

        metadata.forEach(element => {
            const { validations, name } = element
            const inputValue = inputs[name]

            const currentErrors = []
            if (validations) {
                for (const [key, value] of Object.entries(validations)) {

                    switch(key) {
                        case 'required': {
                            const { message } = value
                            if (!inputValue) {
                                currentErrors.push(message ?? `This field is required`)
                            }
                            break
                        }
                        case 'minLength': {
                            const { message, length } = value
                            if (!validationMapper.minLength(length, inputValue?.length)) {
                                currentErrors.push(message ?? `This field must have more than ${length} characters`)
                            }
                            break
                        }
                        case 'maxLength': {
                            const { message, length } = value
                            if(!validationMapper.maxLength(length, inputValue?.length)) {
                                currentErrors.push(message ?? `This field can't have more than ${length} characters`)
                            }
                            break
                        }
                        default:
                            console.error(`Cant find validation named = ${key}`)
                    }
                }

                console.log("Current errors = ", currentErrors)

                if (currentErrors) {
                    errorMessages[name] = currentErrors
                }
            }
        })

        setErrors({...errorMessages})

    }, [metadata, inputs])

    useEffect(() => {
        validate()
    }, [metadata, validate])
    
    return { errors }
}