import { useState } from 'react'

export const useSave = () => {
    const [showSaveDialog, setShowSaveDialog] = useState(false)

    function handleSave() {
        setShowSaveDialog(prevState => !prevState)
    }

    return { showSaveDialog, handleSave }
}