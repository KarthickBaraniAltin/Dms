import { useState } from 'react'

export const useSignatureInputs = () => {
    const [fontInputs, setFontInputs] = useState([])

    const handleSignatureChange = (event, name, metadata) => {
        const checkSameSignature = fontInputs.some(obj => obj.name === name)
        const sameSignatureIndex = fontInputs.findIndex(obj => obj.name === name)

        if (checkSameSignature) {
            let tempFontInputs = JSON.parse(JSON.stringify(fontInputs))
            tempFontInputs[sameSignatureIndex].value = event.target.value
            setFontInputs(tempFontInputs)
        } else {
            setFontInputs([
                ...fontInputs,
                {name: name, value: event.target.value}
            ])
        }

        const index = metadata.findIndex(element => element.name === name)
        metadata[index].fontStyle = event.target.value
    }  

    return {fontInputs, setFontInputs, handleSignatureChange}
}