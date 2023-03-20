import { useState } from 'react'

export const useSave = (data) => {
    const [showSaveDialog, setShowSaveDialog] = useState(false)
    const [name, setName] = useState(data.name)
    const [desc, setDesc] = useState(data.description)

    function handleSave() {
        setShowSaveDialog(prevState => !prevState)
    }

    return { showSaveDialog, handleSave, name, setName, desc, setDesc }
}