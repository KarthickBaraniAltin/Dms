import { createElement } from 'react'
import { Sortable } from '../../../components/DndComponents/Sortable'
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
import CreateFileInput from '../Inputs/CreateFileInput/CreateFileinput'
import clsx from 'clsx'
import CreateTime from '../Inputs/CreateTime/CreateTime'

export default function CreateComponents ({ metadata, openDialog, inputs, handleInputChange, errors }) {

    const componentMapper = {
        'text': CreateText,
        'calendar': CreateCalendar,
        'number': CreateNumber,
        'textarea': CreateTextarea,
        'mask': CreateMask,
        'dropdown': CreateDropdown,
        'time': CreateTime,
        'multiselect': CreateMultiSelect,
        'header': <h1/>,
        'file': CreateFileInput,
        'richText': CreateRichTextInput,
        'subtitle': CreateReadonlySubtitle,
        'signature': CreateSignature,
        'radiobutton': CreateMultiRadioButtons,
        'checkbox': CreateCheckbox
    }

    return (
        <>
            {metadata?.length === 0 && <h5 style={{margin: '0 auto'}}>Drop field here</h5>}
            {metadata?.map((data, index) => {
                const { type, name, divClassName } = data
                return (
                    <div className={clsx(divClassName, 'mt-2')} key={index}>
                        <Sortable key={index} id={index + 1}>
                                {createElement(componentMapper[type],
                                    {
                                        metadata: data,
                                        openDialog: openDialog,
                                        value: inputs[name],
                                        onChange: handleInputChange,
                                        errors: errors[name]
                                    }
                                )}
                        </Sortable>
                    </div>
                )
            })}
        </>
    )
}