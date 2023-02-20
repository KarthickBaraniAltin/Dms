import { useState } from 'react'

export const useHeaderImage = () => {
    const [headerImage, setHeaderImage] = useState({})

    const handleHeaderImage = (event) => {
        if (event.target.dataset) {
            setHeaderImage({[event.target.dataset.name]: { file: event.target.files[0], url: URL.createObjectURL(event.target.files[0]) }})
        }
    }

    return { handleHeaderImage, headerImage }
}