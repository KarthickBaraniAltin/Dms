import useDialogs from '../../../hooks/useDialogs'
import { useValidation } from '../../../hooks/useValidation'
import { createElement } from 'react'
import { useInputs } from '../../../hooks/useInput'
import { Sortable } from '../../../components/DndComponents/Sortable'
import CreateMultiRadioButtons from '../Inputs/CreateMultiRadioButtons/CreateMultiRadioButtons'
import CreateHeader from '../../../components/CreationComponents/CreateLabel/CreateLabel'
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

import styles from '../CreateComponents/CreateComponents.module.css'

export default function CreateComponents ({ metadata, openDialog  }) {
    const { handleInputChange, inputs } = useInputs({ initialValues: {} })
    const { errors } = useValidation({ metadata, inputs })

    const componentMapper = {
        'text': CreateText,
        'calendar': CreateCalendar,
        'number': CreateNumber,
        'textarea': CreateTextarea,
        'mask': CreateMask,
        'dropdown': CreateDropdown,
        'multiselect': CreateMultiSelect,
        'header': CreateHeader,
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
                console.log('type = ', type)
                return (
                    <div className={clsx(divClassName, 'mt-2')} key={index}>
                        <Sortable key={index} id={index + 1}>
                                {/* <div style={{'display': 'flex', 'justifyContent': 'flex-end'}}>{type.toUpperCase()}</div> */}
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