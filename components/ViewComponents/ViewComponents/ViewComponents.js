import React, { createElement } from 'react'
import ViewSignature from '../Inputs/ViewSignature/ViewSignature'
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
import ViewReadonlySubtitle from '../Inputs/ViewReadonlySubtitle/ViewReadonlySubtitle'
import clsx from 'clsx'
import ViewFileInput from '../Inputs/ViewFileInput/ViewFileInput'

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
        'file': ViewFileInput,
        'richText': ViewRichText,
        'subtitle': ViewReadonlySubtitle,
        'signature': ViewSignature,
        'radiobutton': ViewMultiRadioButtons,
        'checkbox': ViewCheckbox
    }

    return (
        <div className='grid grid-nogutter'>
            {metadata?.map((data, index) => {
                const { name, type, divClassName } = data
                return (
                    <div key={index} className={clsx(divClassName ?? 'field col-6', 'mt-2')}>
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
