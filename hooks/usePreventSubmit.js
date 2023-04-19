import { useState } from 'react'

export const usePreventSubmit = ({metadata, inputs}) => {
    const [isDisabled, setIsDisabled] = useState(false)

    const checkErrors = (errors) => {
        for (const property in errors) {
            if (errors[property].length > 0) {
                for (const guid in metadata) {
                    if (property === metadata[guid].name) {
                        return metadata[guid].id
                    }
                }
            }

            for (const guid in metadata) {
                if (property === metadata[guid].name) {
                    if (metadata[guid]?.validations?.required) {
                        if (!inputs?.[property] || inputs?.[property].length < 1) {
                            return metadata[guid].id
                        }
                    }
                }
            }
        }

        return false
    }

    const scrollToComponent = (id) => {
        const component = document.getElementById(id)
        component.scrollIntoView({ behavior: 'smooth' })
    }

    return { isDisabled, setIsDisabled, checkErrors, scrollToComponent }
}