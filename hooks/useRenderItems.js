import cn from 'clsx'
import useDialogs from './useDialogs'
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { MultiSelect } from "primereact/multiselect"
import { createElement } from 'react'
import { useInputs } from './useInput'
import { useValidation } from './useValidation'
import { Sortable } from '../components/DndComponents/Sortable'

export const useRenderItems = ({ metadata, setMetadata }) => {

    const { handleInputChange, inputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata })

    const componentMapper = {
        'text': InputText,
        'calendar': Calendar,
        'number': InputNumber,
        'textarea': InputTextarea,
        'mask': InputMask,
        'dropdown': Dropdown,
        'multiselect': MultiSelect
    }

    const renderLabel = (componentData, label, type, isPreview = false) => {
        const sectionLabelStyle = {'min-width': '10rem', 'border': '2px solid #004990', 'padding': '1rem'}
        const isSectionHeadingForPreview = type === 'section' && isPreview ? true : false
        return (
            <>
                {isPreview ?
                <label className='block' style={{fontWeight: '700', color: '#000000', textAlign: isSectionHeadingForPreview ? 'center' : null}}>
                    {label}
                </label>
                :
                <>
                    <div className="flex justify-content-between" style={type === 'section' ? sectionLabelStyle : null}>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            {label}
                        </label> 
                        <i className='pi pi-cog' style={{fontSize: '1em'}} onClick={() => openDialog(componentData)}></i>
                    </div>
                </>
                }
            </>
        )
    }

    const renderCreateElements = (type, name, rest) => {

        if (type === 'number') { // Required because otherwise the input in the number component will have commas as the number size increases which returns a NaN.
            return (
                <>
                {createElement(
                    componentMapper[type],
                    {...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), value: inputs[name], onChange: handleInputChange, format: false}
                )}
                </>
            )
        } else {
            return (
                <>
                {createElement(
                    componentMapper[type],
                    {...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), value: inputs[name], onChange: handleInputChange}
                )}
                </>
            )
        }
    }

    const renderSubtitle = (subtitle, subtitleComponent) => {
        return (
            <>
                {subtitleComponent}
                { subtitle && <small className='block'>{subtitle}</small>}
            </>
        )
    }

    const renderErrors = (name) => {
        return (
            <>
                { errors[name] && 
                    errors[name].map(element => {
                        return (
                            <small key={element} className='p-error block'>{element}</small> 
                        )
                    })
                }
            </>
        )
    }

    const renderInputField = (type, data, label, name, rest, subtitle, subtitleComponent) => {
        return (
            <div  className='field col-12'>
                <div style={{'display': 'flex', 'justifyContent': 'flex-end'}}>{type.toUpperCase()}</div>
                {renderDialog()}
                {renderLabel(data, label, type)}
                {renderCreateElements(type, name, rest)}
                {renderSubtitle(subtitle, subtitleComponent)}
                {renderErrors(name)}
            </div>
        )
    }

    const renderComponents = (metadata, index, isSection = false) => {
        if (isSection) {
            return (
                <>
                    {metadata.map((data, sectionIndex) => {
                        const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = data
                        if (type === 'section') {
                            return alert('Error: Cannot place section component within another section component.')
                        }
                        return (
                            <>
                                <Sortable key={sectionIndex} id={`${metadata[sectionIndex].id}`}>
                                    {renderInputField(type, data, label, name, rest, subtitle, subtitleComponent)}
                                </Sortable>
                            </>
                        )
                    })}
                </>
            )
        } else {
            const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = metadata
            return (
                <Sortable key={index} id={index + 1}>
                    {renderInputField(type, metadata, label, name, rest, subtitle, subtitleComponent)}
                </Sortable>
            )
        }
    }

    return {renderLabel, renderCreateElements, renderSubtitle, renderErrors, renderInputField, renderComponents}
}