import { createElement, useState } from "react"
import SectionPanelDialog from '../components/Settings/SectionPanelDialog/SectionPanelDialog'
import TextDialog from "../components/Settings/TextDialog/TextDialog"
import TextareaDialog from "../components/Settings/TextareaDialog/TextareaDialog"
import NumberDialog from "../components/Settings/NumberDialog/NumberDialog"
import CalendarDialog from '../components/Settings/CalendarDialog/CalendarDialog'
import { useInputs } from "./useInput"
import MaskDialog from "../components/Settings/MaskDialog/MaskDialog"

const useDialogs = ({ metadata, setMetadata }) => {
    const [ showDialog, setShowDialog ] = useState(false)
    const [ dialogData, setDialogData ] = useState(undefined)
    const { inputs, handleInputChange, setInputs } = useInputs()

    const dialogMapper = {
        'section': SectionPanelDialog,
        'text': TextDialog,
        'number': NumberDialog,
        'calendar': CalendarDialog,
        'textarea': TextareaDialog,
        'mask': MaskDialog
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

        for (let i = 0; i < metadata.length; i++) {
            if (metadata[i].name.includes('section')) {
                let sectionIndex = metadata[i].sectionMetadata.findIndex(sectionElement => sectionElement.name === dialogData.name)

                if (sectionIndex === -1) {
                    continue
                }

                metadata[i].sectionMetadata[sectionIndex] = {...metadata[i].sectionMetadata[sectionIndex], ...inputs}
                setMetadata(metadata)
                setShowDialog(false)
                return
            }
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