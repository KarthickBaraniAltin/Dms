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
import ViewImage from '../Inputs/ViewImage/ViewImage'
import ViewHeader from '../Inputs/ViewHeader/ViewHeader'

export default function ViewComponents({ metadata, inputs, handleInputChange, assignValuesNested, errors }) {

    const componentMapper = {
        'header': ViewHeader,
        'text': ViewText,
        'calendar': ViewCalendar,
        'time': ViewTime,
        'number': ViewNumber,
        'textarea': ViewTextarea,
        'mask': ViewMask,
        'dropdown': ViewDropdown,
        'multiselect': ViewMultiselect,
        'image': ViewImage,
        'file': ViewFileInput,
        'richText': ViewRichText,
        'subtitle': ViewReadonlySubtitle,
        'signature': ViewSignature,
        'radiobutton': ViewMultiRadioButtons,
        'checkbox': ViewCheckbox
    }

    return (
        <div className='grid grid-nogutter'>
            {metadata && Object.keys(metadata).map(guid => {
                const { name, type, divClassName } = metadata[guid]
                return (
                    <div key={guid} className={clsx(divClassName ?? 'field col-6')}>
                        { createElement( 
                            componentMapper[type],
                            {
                                metadata: metadata[guid],
                                value: inputs[name],
                                onChange: handleInputChange,
                                errors: errors[name],
                                assignValuesNested: assignValuesNested
                            }
                        )}
                    </div>
                )
            })}
        </div>
    )
}