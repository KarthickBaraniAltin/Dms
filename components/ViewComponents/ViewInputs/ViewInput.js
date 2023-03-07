import { Calendar } from 'primereact/calendar'
import { InputMask } from 'primereact/inputmask'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'
import React, { createElement } from 'react'
import { CreateCheckbox } from '../../CreationComponents/CreateCheckbox/CreateCheckbox'
import { CreateMultiRadioButtons } from '../../CreationComponents/CreateMultiRadioButtons'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import DropDown from '../../LexicalEditor/UI/DropDown/DropDown'
import FileInput from '../FileInput/FileInput'
import { ViewSignature } from '../ViewSignature/ViewSignature'

export default function ViewComponent({
    type, 
    name, 
    className,
    value,
    onChange,
    metadata,
     ...rest}) {

    const componentMapper = {
        'text': InputText,
        'calendar': Calendar,
        'number': InputNumber,
        'textarea': InputTextarea,
        'mask': InputMask,
        'dropdown': DropDown,
        'multiselect': MultiSelect,
        'header': 'h1',
        'file': FileInput,
        'richText': LexicalEditor,
        'subtitle': 'div',
        'signature': ViewSignature,
        'radiobutton': CreateMultiRadioButtons,
        'checkbox': CreateCheckbox
    }

    return (
        <div>
            { createElement( 
                componentMapper[type],
                {
                    ...rest, name, className, value, onChange
                }
            )}
        </div>
    )
}
