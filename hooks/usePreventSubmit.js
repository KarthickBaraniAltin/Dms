import { useState } from 'react'

export const usePreventSubmit = () => {
    const [isDisabled, setIsDisabled] = useState(false)

    const checkErrors = (errors) => {
        for (const property in errors) {
            if (errors[property].length > 0) {
                return true
            }
        }

        return false
    }

    return { isDisabled, setIsDisabled, checkErrors }
}