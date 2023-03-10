import { InputMask } from 'primereact/inputmask'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'
import React, { createElement } from 'react'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import DropDown from '../../LexicalEditor/UI/DropDown/DropDown'
import FileInput from '../FileInput/FileInput'
import ViewCalendar from '../Inputs/ViewCalendar/ViewCalendar'
import ViewText from '../Inputs/ViewText/ViewText'
import { ViewSignature } from '../ViewSignature/ViewSignature'

export default function ViewComponents({ metadata, inputs, handleInputChange }) {

    const componentMapper = {
        'text': ViewText,
        'calendar': ViewCalendar,
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
        // 'radiobutton': CreateMultiRadioButtons,
        // 'checkbox': CreateCheckbox
    }

    return (
        <div>
            {metadata?.map((element, index) => {
                const { name, type, columnSize } = element
                return (
                    <div key={index} className={columnSize ?? 'field col-6'}>
                        { createElement( 
                            componentMapper[type],
                            {
                                metadata: element,
                                value: inputs[name],
                                onChange: handleInputChange
                            }
                        )}
                    </div>
                )
            })}
        </div>
    )
}
