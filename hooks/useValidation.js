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
            },
            minNum: (minNum, currentNum) => { // The minNum variable is a number because of the onValueChange attribute set in the NumberDialog while currentNum is a string.
                if (!minNum || !currentNum) {
                    return true
                }

                return minNum <= currentNum
            },
            maxNum: (maxNum, currentNum) => { // The maxNum variable is a number because of the onValueChange attribute set in the NumberDialog while currentNum is a string.
                if (!maxNum || !currentNum) {
                    return true
                }

                return maxNum >= currentNum
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
                            if (!validationMapper.maxLength(length, inputValue?.length)) {
                                currentErrors.push(message ?? `This field can't have more than ${length} characters`)
                            }
                            break
                        }
                        case 'minNum': {
                            const { message, number } = value
                            if (!validationMapper.minNum(number, inputValue)) {
                                currentErrors.push(message ?? `This field can't be smaller than ${number}`)
                            }
                            break
                        }
                        case 'maxNum': {
                            const { message, number } = value
                            if (!validationMapper.maxNum(number, inputValue)) {
                                currentErrors.push(message ?? `This field can't be larger than ${number}`)
                            }
                            break
                        }
                        default:
                            console.error(`Cant find validation named = ${key}`)
                    }
                }

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
    
    // console.log("Validation Errors = ", errors)

    return { errors }
}