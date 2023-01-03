import { createElement, useState } from "react"
import TextDialog from "../components/Settings/TextDialog/TextDialog"
import TextareaDialog from "../components/Settings/TextareaDialog/TextareaDialog"
import NumberDialog from "../components/Settings/NumberDialog/NumberDialog"
import { useInputs } from "./useInput"

const useDialogs = ({ metadata, setMetadata }) => {
    const [ showDialog, setShowDialog ] = useState(false)
    const [ dialogData, setDialogData ] = useState(undefined)
    const { inputs, handleInputChange, setInputs } = useInputs()

    // console.log("Show Dialog = ", showDialog)
    // console.log("Dialog Data = ", dialoagData)

    const dialogMapper = {
        'text': TextDialog,
        'number': NumberDialog,
        'calendar': undefined,
        'textarea': TextareaDialog
    } 

    const hideDialog = () => {
        setDialogData(undefined)
        setShowDialog(false)
    }

    const openDialog = (data) => {
        if (!dialogMapper[data.type]) {
            console.error("Given dialog type doesn't exist in dialog mapper, component can't be created")
            return
        }

        setDialogData(data)
        setShowDialog(true)
        setInputs(data)
    }

    const handleUpdate = () => {
        if (!dialogData) {
            return
        }

        const index = metadata.findIndex(element => element.name === dialogData.name)
        metadata[index] = {...metadata[index], ...inputs}
        setMetadata(metadata)
        setShowDialog(false)
    }

    const renderDialog = () => {
        return (
            <>
                { showDialog && dialogMapper[dialogData.type] &&
                    createElement(
                        dialogMapper[dialogData.type],
                        {inputs: inputs, handleInputChange: handleInputChange, visible: showDialog, hideDialog, handleUpdate}
                    )
                }
            </>
        )
    }

    return { renderDialog, openDialog, hideDialog }
}

export default useDialogs