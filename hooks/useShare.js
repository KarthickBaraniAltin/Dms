import { useState } from 'react'

export const useShare = () => {
    const [showShareDialog, setShowShareDialog] = useState(false)
    const [formSubmitResult, setFormSubmitResult] = useState(null)
    const isShareDisabled = {
        ...(formSubmitResult ? {} : { disabled: true })
    }

    function handleShare() {
        setShowShareDialog(prevState => !prevState)
    }

    return { showShareDialog, handleShare, formSubmitResult, setFormSubmitResult, isShareDisabled }
}