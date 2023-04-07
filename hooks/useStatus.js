import { useState } from 'react'

export const useStatus = () => {
    const [showStatusDialog, setShowStatusDialog] = useState(false)

    function handleStatus() {
        setShowStatusDialog(prevState => !prevState)
    }

    return { showStatusDialog, handleStatus }
}