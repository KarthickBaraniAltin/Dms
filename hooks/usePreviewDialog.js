import React, { useState } from 'react'

export const usePreviewDialog = () => {
    const [showPreviewDialog, setShowPreviewDialog] = useState(false)

    function handlePreview() {
        setShowPreviewDialog(prevState => !prevState)
    }

    return { showPreviewDialog, handlePreview }
}