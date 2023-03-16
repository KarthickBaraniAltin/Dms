import React, { createElement } from 'react'
import { ViewSignature } from '../ViewSignature/ViewSignature'
import FileInput from '../FileInput/FileInput'
import ViewCalendar from '../Inputs/ViewCalendar/ViewCalendar'
import ViewText from '../Inputs/ViewText/ViewText'
import ViewNumber from '../Inputs/ViewNumber/ViewNumber'
import ViewTextarea from '../Inputs/ViewTextarea/ViewTextarea'
import ViewMask from '../Inputs/ViewMask/ViewMask'
import ViewDropdown from '../Inputs/ViewDropdown/ViewDropdown'
import ViewMultiselect from '../Inputs/ViewMultiselect/ViewMultiselect'
import ViewRichText from '../Inputs/ViewRichText/ViewRichText'
import ViewMultiRadioButtons from '../Inputs/ViewMultiRadioButtons/ViewMultiRadioButtons'
import ViewCheckbox from '../Inputs/ViewCheckbox/ViewCheckbox'
import ViewTime from '../Inputs/ViewTime/ViewTime'
import ViewSubtitle from '../Inputs/ViewSubtitle/ViewSubtitle'

export default function ViewComponents({ metadata, inputs, handleInputChange, errors }) {

    const componentMapper = {
        'text': ViewText,
        'calendar': ViewCalendar,
        'time': ViewTime,
        'number': ViewNumber,
        'textarea': ViewTextarea,
        'mask': ViewMask,
        'dropdown': ViewDropdown,
        'multiselect': ViewMultiselect,
        'header': 'h1',
        'file': FileInput,
        'richText': ViewRichText,
        'subtitle': ViewSubtitle,
        'signature': ViewSignature,
        'radiobutton': ViewMultiRadioButtons,
        'checkbox': ViewCheckbox
    }

    console.log('inputs:', inputs)

    return (
        <div className='grid grid-nogutter'>
            {metadata?.map((data, index) => {
                const { name, type, divClassName } = data
                return (
                    <div key={index} className={divClassName ?? 'field col-6'}>
                        { createElement( 
                            componentMapper[type],
                            {
                                metadata: data,
                                value: inputs[name],
                                onChange: handleInputChange,
                                errors: errors[name]
                            }
                        )}
                    </div>
                )
            })}
        </div>
    )
}
