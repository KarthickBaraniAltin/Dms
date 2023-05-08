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
import ViewComponentContainer from './ViewComponentContainer/ViewComponentContainer'
import ViewAddress from '../Inputs/ViewAddress/ViewAddress'

export default function ViewComponents({ metadata, inputs, handleInputChange, assignValuesNested, errors, conditions, validationMapper }) {

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
        'checkbox': ViewCheckbox,
        'address': ViewAddress
    }

    // const expressionsValidator = () => {
    //     if (!condition || !condition.expressions) {
    //         return
    //     }
    //     const { expressions } = condition
    //     const currentMetadata = metadata

    //     Object.entries(expressions).map(([key, value]) => {
    //         const component = metadata[key]
    //         const input = inputs?.[component.name] ?? undefined

    //         const { type, rule, val } = value
    //         const { validation, expectedResult } = rule

    //         const func = validationMapper[rule.validation]

    //         if (validation === 'isFilled') {
    //             if (validationMapper[validation](input) !== expectedResult) {
    //                 return false
    //             }
    //         } 

    //     })

    //     return true
    // }

    const updateMetadataWithConditions = () => {
        let viewMetadata = {...metadata}
    
        if (!conditions) {
            return viewMetadata
        }


        for (const [key, value] of Object.entries(conditions)) {
            const { expressions, actions } = value

            let expressionsResult = true
            for (const [key, value] of Object.entries(expressions)) {
                if (!value) {
                    return viewMetadata    
                }
        
                const { field } = value;
                if (!metadata[field]) {
                    console.warn("Expressions is not valid: ", expressions);
                    return viewMetadata
                }

                const inputValue = inputs[metadata[field].name]
                if (!evaluateExpression(value, inputValue)) {
                    expressionsResult = false
                }
            }


            for (const [key, value] of Object.entries(actions)) {
                const { rule, fields } = value

                if (expressionsResult) {
                    switch (rule) {
                        case 'Hide':
                            fields.forEach((field) => {
                                delete viewMetadata[field]
                            })
                            break
                        case 'Show':
                            fields.forEach((field) => {
                                viewMetadata[field] = metadata[field]
                            })
                            break
                        case 'Disable':
                            fields.forEach((field) => {
                                viewMetadata[field].disabled = true
                            })
                            break
                        case 'Enable':
                            fields.forEach((field) => {
                                viewMetadata[field].disabled = false
                            })
                            break
                    }
                } else {
                    switch (rule) {
                        case 'Show':
                            fields.forEach((field) => {
                                delete viewMetadata[field]
                            })
                            break
                        case 'Hide':
                            fields.forEach((field) => {
                                viewMetadata[field] = metadata[field]
                            })
                            break
                        case 'Enable':
                            fields.forEach((field) => {
                                viewMetadata[field].disabled = true
                            })
                            break
                        case 'Disable':
                            fields.forEach((field) => {
                                viewMetadata[field].disabled = false
                            })
                            break
                    }
                }
            }
        }

        // Checking the validity of expressions
        
        
        // Applying actions
        // if (expressionsResult) {
        //     Object.entries(actions).map(([key, value]) => {
        //         const { fields, rule } = value

        //         if (!rule) {
                    
        //         }

        //         switch (rule) {
        //             case '':

        //                 break
        //         }
                
        //     })
        // }
        return viewMetadata
    }

    const applyAction = (action, input) => {

    }


    const evaluateExpression = (expression, input) => {
        console.log("Evaludating expression = ", expression)
        const { type, rule, val } = expression
        const { validation, expectedResult } = rule

        switch (validation) {
            case 'isFilled':
                if (validationMapper[validation](input) !== expectedResult) {
                    return false
                }
                break
            case 'stringContains':
                if (validationMapper[validation](input, val) !== expectedResult) {
                    return false
                }
                break
            case 'maxDate':
                if (validationMapper[validation](val, input) !== expectedResult) {
                    return false
                }
                break
            case 'minDate': 
                if (validationMapper[validation](val, input) !== expectedResult) {
                    return false
                }
                break
        }

        return true
    }

    const viewMetadata = updateMetadataWithConditions()

    return (
        <div className='grid grid-nogutter'>
            {viewMetadata && Object.keys(viewMetadata).map(guid => {
                const { name, type, divClassName } = viewMetadata[guid]
                
                return (
                    <ViewComponentContainer key={guid} className={clsx(divClassName ?? 'field col-6', 'mt-1')}>
                        { createElement( 
                            componentMapper[type],
                            {
                                metadata: viewMetadata[guid],
                                value: inputs[name],
                                onChange: handleInputChange,
                                errors: errors[name],
                                assignValuesNested: assignValuesNested
                            }
                        )}
                    </ViewComponentContainer>
                )
            })}
        </div>
    )
}