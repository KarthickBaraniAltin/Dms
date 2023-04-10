import { createElement } from 'react'
import { Sortable } from '../../DndComponents/Sortable/Sortable'
import CreateMultiRadioButtons from '../Inputs/CreateMultiRadioButtons/CreateMultiRadioButtons'
import CreateMask from '../Inputs/CreateMask/CreateMask'
import CreateRichTextInput from '../Inputs/CreateRichTextInput/CreateRichTextInput'
import CreateReadonlySubtitle from '../Inputs/CreateReadonlySubtitle/CreateReadonlySubtitle'
import CreateCalendar from '../Inputs/CreateCalendar/CreateCalendar'
import CreateText from '../Inputs/CreateText/CreateText'
import CreateNumber from '../Inputs/CreateNumber/CreateNumber'
import CreateTextarea from '../Inputs/CreateTextarea/CreateTextarea'
import CreateDropdown from '../Inputs/CreateDropdown/CreateDropdown'
import CreateMultiSelect from '../Inputs/CreateMultiSelect/CreateMultiSelect'
import CreateSignature from '../Inputs/CreateSignature/CreateSignature'
import CreateCheckbox from '../Inputs/CreateCheckbox/CreateCheckbox'
import clsx from 'clsx'
import CreateTime from '../Inputs/CreateTime/CreateTime'
import CreateFileInput from '../Inputs/CreateFileInput/CreateFileInput'
import CreateImage from '../Inputs/CreateImage/CreateImage'
import CreateHeader from '../Inputs/CreateHeader/CreateHeader'

export default function CreateComponents ({ metadata, assignValuesNested, openDialog, inputs, setMetadata, handleInputChange, errors, setFiles, setInputs }) {
    const objectKeysArray = Object.keys(metadata)

    const componentMapper = {
        'text': CreateText,
        'calendar': CreateCalendar,
        'number': CreateNumber,
        'textarea': CreateTextarea,
        'mask': CreateMask,
        'dropdown': CreateDropdown,
        'time': CreateTime,
        'multiselect': CreateMultiSelect,
        'header': CreateHeader,
        'image': CreateImage,
        'file': CreateFileInput,
        'richText': CreateRichTextInput,
        'subtitle': CreateReadonlySubtitle,
        'signature': CreateSignature,
        'radiobutton': CreateMultiRadioButtons,
        'checkbox': CreateCheckbox
    }

    return (
        <>
            {objectKeysArray?.length === 0 && <h5 style={{margin: '0 auto'}}>Drop field here</h5>}
            {objectKeysArray?.map(guid => {
                const { type, name, divClassName } = metadata[guid]
                return (
                    <div className={clsx(divClassName, 'mt-4')} key={guid}>
                        <Sortable key={guid} id={guid}>
                                {createElement(componentMapper[type],
                                    {
                                        guid: guid,
                                        setMetadata: setMetadata,
                                        metadata: metadata[guid],
                                        openDialog: openDialog,
                                        value: inputs[name],
                                        onChange: handleInputChange,
                                        assignValuesNested: assignValuesNested,
                                        errors: errors[name],
                                        setFiles: setFiles,
                                        setInputs: setInputs
                                    }
                                )}
                        </Sortable>
                    </div>
                )
            })}
        </>
    )
}