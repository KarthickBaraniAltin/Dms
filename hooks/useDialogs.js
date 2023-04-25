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
import ImageDialog from "../components/Settings/ImageDialog/ImageDialog"

const useDialogs = ({ metadata, setMetadata, deleteField }) => {
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
        'image': ImageDialog,
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

    const optionsValidation = (options, setInvalidOptions) => {
        if (options) {
            for (const option of options) {
                if (option.label === '' || option.value === '') {
                    setInvalidOptions(true)
                    alert('Value fields cannot be left blank')
                    return true
                }
            }

            const values = options.map(option => option.value)

            if (new Set(values).size !== values.length) {
                // The Set object automatically removes duplicates so if the size of the Set is smaller than
                // the length of either labels or values then we know there are duplicates.
                setInvalidOptions(true)
                alert('Value fields cannot have duplicates')
                return true
            } else {
                setInvalidOptions(false)
                return false
            }
        }
    }

    const handleUpdate = (isDeleted = false, options = null, setInvalidOptions) => {
        if (!dialogData) {
            return
        }

        if (options) {
            if (dialogData.type === 'dropdown' && options.length < 1) {
                return alert('Please add at least one option to dropdown')
            }

            if (dialogData.type === 'multiselect' && options.length < 2) {
                return alert('Please add at least two options to multiselect dropdown')
            }
        }

        if (optionsValidation(options, setInvalidOptions)) {
            return
        }

        if (isDeleted) {
            if (confirm('You are about to delete this component. Do you wish to proceed?')) {
                delete metadata[dialogData.guid]
                deleteField(dialogData.name)
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