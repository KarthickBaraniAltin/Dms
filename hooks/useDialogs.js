import { createElement, useState } from "react"
import TextDialog from "../components/Settings/TextDialog/TextDialog"
import NumberDialog from "../components/Settings/NumberDialog/NumberDialog"
import { useInputs } from "./useInput"

const useDialogs = ({ metadata, setMetadata }) => {
    const [ showDialog, setShowDialog ] = useState(false)
    const [ dialoagData, setDialogData ] = useState(undefined)
    const { inputs, handleInputChange, setInputs } = useInputs()

    // console.log("Show Dialog = ", showDialog)
    // console.log("Dialog Data = ", dialoagData)

    const dialogMapper = {
        'text': TextDialog,
        'number': NumberDialog
    } 

    const hideDialog = () => {
        console.log("Hiding")
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
        if (!dialoagData) {
            return
        }

        const index = metadata.findIndex(element => element.name === dialoagData.name)
        metadata[index] = {...metadata[index], ...inputs}
        setMetadata(metadata)
    }

    const renderDialog = () => {
        return (
            <>
                { showDialog && dialogMapper[dialoagData.type] &&
                    createElement(
                        dialogMapper[dialoagData.type],
                        {inputs: inputs, handleInputChange: handleInputChange, visible: showDialog, hideDialog, handleUpdate}
                    )
                }
            </>
        )
    }

    return { renderDialog, openDialog, hideDialog }
}

export default useDialogs