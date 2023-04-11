import { createElement, useState } from "react"
import { useInputs } from "./useInput"
import SectionPanelDialog from '../components/Settings/SectionPanelDialog/SectionPanelDialog'
import TextDialog from "../components/Settings/TextDialog/TextDialog"
import TextareaDialog from "../components/Settings/TextareaDialog/TextareaDialog"
import NumberDialog from "../components/Settings/NumberDialog/NumberDialog"
import CalendarDialog from '../components/Settings/CalendarDialog/CalendarDialog'
import MaskDialog from "../components/Settings/MaskDialog/MaskDialog"
import HeaderDialog from "../components/Settings/HeaderDialog/HeaderDialog"
import FileDialog from "../components/Settings/FileDialog/FileDialog"
import SubtitleDialog from "../components/Settings/SubtitleDialog/SubtitleDialog"
import RichTextDialog from "../components/Settings/RichTextDialog/RichTextDialog"
import DropdownDialog from "../components/Settings/DropdownDialog/DropdownDialog"
import SignatureDialog from "../components/Settings/SignatureDialog/SignatureDialog"
import MultiRadioButtonsDialog from '../components/Settings/MultiRadioButtonsDialog/MultiRadioButtonsDialog'
import CheckboxDialog from "../components/Settings/CheckboxDialog/CheckboxDialog"
import TimeDialog from "../components/Settings/TimeDialog/TimeDialog"

const useDialogs = ({ metadata, setMetadata }) => {
    const [ showDialog, setShowDialog ] = useState(false)
    const [ dialogData, setDialogData ] = useState(undefined)
    const { inputs, handleInputChange, assignValuesNested, setInputs } = useInputs({ initialValues: {} })

    const dialogMapper = { 
        'section': SectionPanelDialog,
        'text': TextDialog,
        'number': NumberDialog,
        'calendar': CalendarDialog,
        'time': TimeDialog,
        'textarea': TextareaDialog,
        'mask': MaskDialog,
        'header': HeaderDialog,
        'file': FileDialog,
        'subtitle': SubtitleDialog,
        'richText': RichTextDialog,
        'signature': SignatureDialog,
        'radiobutton': MultiRadioButtonsDialog,
        'dropdown': DropdownDialog,
        'multiselect': DropdownDialog,
        'checkbox': CheckboxDialog
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

    const handleUpdate = (isDeleted = false, options = null, setBlankOptions) => {
        if (!dialogData) {
            return
        }

        if (options) {
            if (options.some(option => {
                if (option.label === '' || option.value === '') {
                    return true
                } else {
                    return false
                }
            })) {
                setBlankOptions(true)
                return alert('Options cannot be left blank')
            } else {
                setBlankOptions(false)
            }
        }

        if (isDeleted) {
            if (confirm('You are about to delete this component. Do you wish to proceed?')) {
                delete metadata[dialogData.guid]
            }
        } else {
            metadata[dialogData.guid] = {...metadata[dialogData.guid], ...inputs}
        }

        setMetadata(metadata)
        setShowDialog(false)
    }

    const renderDialog = () => {
        return (
            <>
                { showDialog && dialogMapper[dialogData.type] &&
                    createElement(
                        dialogMapper[dialogData.type],
                        {inputs: inputs, handleInputChange, assignValuesNested, visible: showDialog, hideDialog, handleUpdate}
                    )
                }
            </>
        )
    }

    return { renderDialog, openDialog, hideDialog }
}

export default useDialogs