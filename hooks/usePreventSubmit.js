import { useState } from 'react'

export const usePreventSubmit = ({metadata, inputs}) => {
    const [isDisabled, setIsDisabled] = useState(false)

    const checkErrors = (errors) => {
        for (const property in errors) {
            if (errors[property].length > 0) {
                return true
            }

            for (const guid in metadata) {
                if (property === metadata[guid].name) {
                    if (metadata[guid]?.validations?.required) {
                        if (!inputs?.[property] || inputs?.[property].length < 1) {
                            return true
                        }
                    }
                }
            }
        }

        return false
    }

    return { isDisabled, setIsDisabled, checkErrors }
}