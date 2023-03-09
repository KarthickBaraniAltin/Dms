import { useState } from 'react'

export const useShare = () => {
    const [showShareDialog, setShowShareDialog] = useState(false)

    function handleShare() {
        setShowShareDialog(prevState => !prevState)
    }

    return { showShareDialog, handleShare }
}