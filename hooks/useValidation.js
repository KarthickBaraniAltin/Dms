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
            },
            minDate: (minDate, inputValue, calendarName) => {               
                const index = metadata.findIndex(element => element.name === calendarName)

                metadata[index].minDate = minDate          

                if (minDate.getFullYear() >= inputValue?.getFullYear()) {
                    if (minDate.getMonth() >= inputValue?.getMonth()) {
                        if (minDate.getDate() >= inputValue?.getDate()) {
                            return true
                        }
                    }
                } else {
                    return false
                }
            },
            maxDate: (maxDate, inputValue, calendarName) => {
                const index = metadata.findIndex(element => element.name === calendarName)

                metadata[index].maxDate = maxDate

                // if (maxDate.getFullYear() < inputValue?.getFullYear()) return true
                // if (maxDate.getMonth() < inputValue?.getMonth()) return true
                // if (maxDate.getDate() < inputValue?.getDate()) return true

                if (maxDate.getFullYear() <= inputValue?.getFullYear()) {
                    if (maxDate.getMonth() <= inputValue?. getMonth()) {
                        if (maxDate.getDate() <= inputValue?.getDate()) {
                            return true
                        }
                    }
                } else {
                    return false
                }
            },
            setMask: (mask, maskName) => {
                const index = metadata.findIndex(element => element.name === maskName)

                metadata[index].mask = mask
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
                        case 'minDate': {
                            const { message, date } = value
                            if (validationMapper.minDate(date, inputValue, name)) {
                                currentErrors.push(message ?? `Please pick a date on or after ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)
                            }
                            break
                        }
                        case 'maxDate': {
                            const { message, date } = value
                            if (validationMapper.maxDate(date, inputValue, name)) {
                                currentErrors.push(message ?? `Please pick a date on or before ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)
                            }
                            break
                        }
                        case 'setMask': {
                            const { mask } = value
                            validationMapper.setMask(mask, name)
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
    
<<<<<<< HEAD
    // console.log("Validation Errors = ", errors)

=======
>>>>>>> feature/apiCallForms
    return { errors }
}