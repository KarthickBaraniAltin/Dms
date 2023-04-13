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
            minDate: (minDate, inputValue, calendarGuid) => {
                if (minDate === undefined) return
                metadata[calendarGuid].minDate = minDate      
                  

                if (minDate.getFullYear() >= inputValue?.getFullYear()) {
                    if (minDate.getMonth() >= inputValue?.getMonth()) {
                        if (minDate.getDate() > inputValue?.getDate()) {
                            return true
                        }
                    }
                } else {
                    return false
                }
            },
            maxDate: (maxDate, inputValue, calendarGuid) => {
                if (maxDate === undefined) return
                metadata[calendarGuid].maxDate = maxDate

                if (maxDate.getFullYear() <= inputValue?.getFullYear()) {
                    if (maxDate.getMonth() <= inputValue?. getMonth()) {
                        if (maxDate.getDate() < inputValue?.getDate()) {
                            return true
                        }
                    }
                } else {
                    return false
                }
            },
            minTime: (minTime, currentTime) => {
                if (minTime === undefined) return

                if (minTime.getHours() >= currentTime?.getHours()) {
                    if (minTime.getMinutes() > currentTime?.getMinutes()) {
                        return true
                    } else if (minTime.getHours() > currentTime?.getHours()) {
                        return true
                    }
                } else {
                    return false
                }
            },
            maxTime: (maxTime, currentTime) => {
                if (maxTime === undefined) return

                if (maxTime.getHours() <= currentTime?.getHours()) {
                    if (maxTime.getMinutes() < currentTime?.getMinutes()) {
                        return true
                    } else if (maxTime.getHours() < currentTime.getHours()) {
                        return true
                    }
                } else {
                    return false
                }
            },
            setMask: (mask, maskGuid) => {
                metadata[maskGuid].mask = mask
            },
            minFile: (minFileSize, fileTypes) => {
                if (!minFileSize || !fileTypes) return true
                
                return fileTypes.some(file => {
                    if (file.size < minFileSize) return false
                    if (fileTypes.indexOf(file) === fileTypes.length - 1) return true
                })
            },
            maxFile: (maxFileSize, fileTypes) => {
                if (!maxFileSize || !fileTypes) {
                    return true
                }

                return fileTypes.some(file => {
                    if (file.size > maxFileSize) return false
                    if (fileTypes.indexOf(file) === fileTypes.length - 1) return true
                })
            },
            fileTypes: (validFileTypes, fileTypes) => {
                if (validFileTypes === undefined || fileTypes === undefined) return
                return validFileTypes.some(validFileType => {
                    return fileTypes.some(fileType => {
                        if (validFileType !== fileType.type) {
                            return false
                        } else {
                            return true
                        }
                    })
                })
            },
            fonts: (font, guid) => {               
                metadata[guid].fontStyle = font
            }
        }

        if (metadata && Object.keys(metadata).length > 0) {
            const errorMessages = {}

            for (const [key, element] of Object.entries(metadata)) {
                const { validations, name, guid } = element
                const inputValue = inputs[name]
                const currentErrors = []

                if (validations) {
                    for (const [key, value] of Object.entries(validations)) {
                        switch(key) {
                            case 'required': {
                                const { message, isRequired } = value
                                if ((inputValue === '' || (Array.isArray(inputValue) && inputValue.length === 0)) && isRequired) {
                                    // The reason I used inputValue === '' is so that the required validation doesn't
                                    // activate until the user actually changes the input and leaves it blank.
                                    currentErrors.push(message ?? `This field is required`)
                                }
                                break
                            }
                            case 'minLength': {
                                const { message, length } = value
                                if (!validationMapper.minLength(length, inputValue?.length)) {
                                    currentErrors.push(message ?? `This field must have at least ${length} characters`)
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
                                let newDate = new Date(date)
                                if (validationMapper.minDate(newDate, inputValue, guid)) {
                                    currentErrors.push(message ?? `Please pick a date on or after ${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`)
                                }
                                break
                            }
                            case 'maxDate': {
                                const { message, date } = value
                                let newDate = new Date(date)
                                if (validationMapper.maxDate(newDate, inputValue, guid)) {
                                    currentErrors.push(message ?? `Please pick a date on or before ${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`)
                                }
                                break
                            }
                            case 'minTime': {
                                const { message, time } = value
                                let newTime = new Date(time)
                                if (validationMapper.minTime(newTime, inputValue)) {
                                    let hours = newTime.getHours()
                                    let isPM = false

                                    if (hours === 12) {
                                        isPM = true
                                    } else if (hours > 12) {
                                        hours -= 12
                                        isPM = true
                                    }

                                    currentErrors.push(message ?? `Please pick a time on or after ${hours}:${newTime.getMinutes() < 10 ? '0' + newTime.getMinutes() : newTime.getMinutes()}:${isPM ? 'PM' : 'AM'}`)
                                }
                                break
                            }
                            case 'maxTime': {
                                const { message, time } = value
                                let newTime = new Date(time)
                                if (validationMapper.maxTime(newTime, inputValue)) {
                                    let hours = newTime.getHours()
                                    let isPM = false

                                    if (hours === 12) {
                                        isPM = true
                                    } else if (hours > 12) {
                                        hours -= 12
                                        isPM = true
                                    }

                                    currentErrors.push(message ?? `Please pick a time on or before ${hours}:${newTime.getMinutes() < 10 ? '0' + newTime.getMinutes() : newTime.getMinutes()}:${isPM ? 'PM' : 'AM'}`)
                                }
                                break
                            }
                            case 'setMask': {
                                const { mask } = value
                                validationMapper.setMask(mask, guid)
                                break
                            }
                            case 'minFile': {
                                const { fileSize, message } = value
                                if (!validationMapper.minFile(fileSize, inputValue)) {
                                    currentErrors.push(message ?? `File(s) size must be larger than ${fileSize} bits`)
                                }
                                break
                            }
                            case 'maxFile': {
                                const { fileSize, message } = value
                                if (!validationMapper.maxFile(fileSize, inputValue)) {
                                    currentErrors.push(message ?? `File(s) size must be smaller than ${fileSize} bits`)
                                }
                                break
                            }
                            case 'fileTypes': {
                                const { fileTypes, message } = value
                                if (!validationMapper.fileTypes(fileTypes, inputValue)) {
                                    const validFileTypes = fileTypes.map((fileType, index) => {
                                        return <li key={index}>{fileType.split('/')[1]}</li>
                                    })
                                    const finalFileTypeMessage = (
                                        <div>
                                            <p style={{margin: 0}}>Accepted file types:</p>
                                            <ul style={{margin: 0, padding: '0 1rem'}}>{validFileTypes}</ul>
                                        </div>
                                    )
                                    currentErrors.push(message ?? finalFileTypeMessage)
                                }
                                break
                            }
                            case 'fontFamily': {
                                const { font } = value
                                validationMapper.fonts(font, guid)
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
            }

            // metadata.forEach(element => {
            // })

            setErrors({...errorMessages})
        }
    }, [metadata, inputs])

    useEffect(() => {
        validate()
    }, [metadata, validate])
    
    return { errors }
}