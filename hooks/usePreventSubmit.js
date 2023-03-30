import { useState } from 'react'

export const usePreventSubmit = () => {
    const [isDisabled, setIsDisabled] = useState(false)

    const checkErrors = (errors, metadata) => {
        for (const property in metadata) {
            if (metadata[property]?.validations?.required?.isRequired) {
                return true
            }
        }

        for (const property in errors) {
            if (errors[property].length > 0) {
                return true
            }
        }

        return false
    }

    return { isDisabled, setIsDisabled, checkErrors }
}