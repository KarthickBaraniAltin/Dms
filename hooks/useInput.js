import { useState } from "react"

export const useInputs = (options) => {
    const [inputs, setInputs] = useState(options?.defaultValues || {})

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

    return { handleInputChange, inputs, setInputs }
}