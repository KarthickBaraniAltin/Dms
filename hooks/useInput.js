import { useState } from "react"

export const useInputs = (options) => {
    const [inputs, setInputs] = useState(options?.initialValues || {})

    const handleFileInputChange = (event) => {
        if (event.target.files[0]) {
            const { name } = event.target
            setInputs({...inputs, [name]: {
                fileName: event.target.files[0].name,
                size: event.target.files[0].size,
                type: event.target.files[0].type
            }})
        }

    }

    const handleInputChange = (event) => {
        if (event.target) {
            const { name, value } = event.target
            assignValuesNested(name, value)
            // setInputs(inputs => ({...inputs, [name]: value}))
        } else if (event.originalEvent) {
            const { name, value } = event.originalEvent.target
            assignValuesNested(name, value)
            // setInputs(inputs => ({...inputs, [name]: value}))
        } else {
            console.error("Error: can't find event target")
        }
    }

    // We can give values nested objects will be created and assigned accordingly
    const assignValuesNested = (path, value) => {
        const pathArr = path.split('.')
        const lastKeyIndex = pathArr.length - 1
        let updatedInputs = {...inputs}
        let tmp = updatedInputs
        for (let i = 0; i < lastKeyIndex; ++i) {
            var key = pathArr[i]
            if (!(key in tmp)) {
                tmp[key] = {}
            }
            tmp = tmp[key]
        }
        tmp[pathArr[lastKeyIndex]] = value
        setInputs({...updatedInputs})
    }

    return { handleInputChange, handleFileInputChange, inputs, setInputs }
}