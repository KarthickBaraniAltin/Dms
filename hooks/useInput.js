import { useState } from "react"

export const useInputs = (options) => {
    const [inputs, setInputs] = useState(options?.defaultValues || {})

    const handleInputChange = (event) => {        
        if (event.target) {
            const { name, value } = event.target
            setInputs(inputs => ({...inputs, [name]: value}))
        } else if (event.originalEvent) {
            const { name, value } = event.originalEvent.target
            setInputs(inputs => ({...inputs, [name]: value}))
        } else {
            console.error("Error: can't find event target")
        }
    }

    return { handleInputChange, inputs, setInputs }
}