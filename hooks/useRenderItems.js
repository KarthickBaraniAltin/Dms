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
import { CreateSignature } from '../components/CreationComponents/CreateSignature'
import { ViewSignature } from '../components/ViewComponents/ViewSignature'
import { CreateMultiRadioButtons } from '../components/CreationComponents/CreateMultiRadioButtons'

export const useRenderItems = ({ metadata, setMetadata, headerImage, handleHeaderImage }) => {

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
        'multiselect': MultiSelect,
        'header': 'h1',
        'file': 'input',
        'richtext': InputText,
        'signature': CreateSignature,
        'signatureDisplay': ViewSignature,
        'radiobutton': CreateMultiRadioButtons
    }

    const renderLabel = (componentData, label, type, isPreview = false, isHeader = false) => {
        const sectionLabelStyle = {'min-width': '10rem', 'border': '2px solid #004990', 'padding': '1rem'}
        const isSectionHeadingForPreview = (type === 'section' && isPreview) ? true : false

        return (
            <>
                {isPreview && isHeader ?
                <div className='flex flex-column'>
                    <div>
                        <div style={{'color': 'black', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '0 2rem'}}> {/* 'background': '#004990', 'marginBottom': '0.5rem', padding: '1rem', borderRadius: '1rem'  */}
                            {headerImage[componentData.name]?.url ? 
                            <img src={headerImage[componentData.name].url} style={{alignSelf: 'center'}} width='100%' height='auto' /> 
                            : 
                            <div style={{width: '100px', height: '100px'}}></div>
                            }
                            <h1 style={{alignSelf: 'center', textAlign: 'center'}}>{label}</h1>
                            <div style={{width: '100px', height: '100px'}}></div>
                        </div>
                    </div>
                </div>
                :
                isPreview ?
                <label className='block' style={{fontWeight: '700', color: '#000000', textAlign: isSectionHeadingForPreview ? 'center' : null}}>
                    {label}
                </label>
                :
                isHeader ?
                <>
                    <div className='flex flex-column'>
                        <i className='pi pi-cog' style={{fontSize: '1em', alignSelf: 'flex-end', marginBottom: '0.25rem'}} onClick={() => openDialog(componentData)}></i>
                        <div>
                            <div>
                                <div style={{'border': '1px #004990 solid', 'color': 'black', 'marginBottom': '0.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '0 2rem', padding: '1rem', borderRadius: '1rem'}}>
                                    {headerImage[componentData.name]?.url ? 
                                    <img src={headerImage[componentData.name].url} style={{alignSelf: 'center'}} width='100%' height='auto' /> 
                                    : 
                                    <div style={{width: '100%', height: 'auto'}}></div>
                                    }
                                    <label style={{alignSelf: 'center', textAlign: 'center', fontWeight: '700'}}>{label}</label>
                                    <div style={{width: '100%', height: 'auto'}}></div>
                                </div>
                            </div>
                            {<input type='file' onChange={handleHeaderImage} accept="image/png, image/jpeg" data-name={componentData?.name} />}
                        </div>
                    </div>
                </>
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

    const renderCreateElements = (type, name, rest, fontStyle) => {
        if (type === 'richtext') {
            return 
        }

        return (
            <>
                {createElement(
                    componentMapper[type],
                    {
                        ...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), 
                        value: type === 'file' ? null : inputs[name], onChange: handleInputChange, 
                        fontStyle: type.startsWith('signature') ? fontStyle : null, type: type === 'file' ? 'file' : null, 
                        multiple: type === 'file' ? true : null, metadata: type === 'signatureDisplay' || type === 'radiobutton' ? metadata : null, 
                    }
                )}
            </>
        )
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

    const renderInputField = (type, data, label, name, rest, subtitle, subtitleComponent, fontStyle) => {
        let fieldSize

        if (rest?.columnSize) {
            if (rest.columnSize.value == 'field col-6') {
                fieldSize = rest.columnSize
            } else {
                fieldSize = 'field col-12'
            }
        } else {
            fieldSize = 'field col-12'
        }

        return (
            <div className={fieldSize} style={{width: type === 'textarea' ? '214.4px' : type === 'dropdown' ? '200px' : null}}>
                <div style={{'display': 'flex', 'justifyContent': 'flex-end'}}>{type.toUpperCase()}</div>
                {renderDialog()}
                {type === 'header' ? renderLabel(data, label, type, false, true) : renderLabel(data, label, type)}
                {renderCreateElements(type, name, rest, fontStyle)}
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
            const { type, subtitle, label, subtitleComponent, name, defaultValue, fontStyle, ...rest } = metadata
            return (
                <Sortable key={index} id={index + 1}>
                    {renderInputField(type, metadata, label, name, rest, subtitle, subtitleComponent, fontStyle)}
                </Sortable>
            )
        }
    }

    return {renderLabel, renderCreateElements, renderSubtitle, renderErrors, renderInputField, renderComponents}
}