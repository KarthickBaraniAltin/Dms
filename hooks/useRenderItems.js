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
import { useState } from 'react'
import { Droppable } from '../components/DndComponents/Droppable'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

export const useRenderItems = ({ metadata, setMetadata, headerImage, handleHeaderImage }) => {

    const { handleInputChange, handleSignatureChange, inputs, fontInputs } = useInputs({})
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
        'signature': InputText
    }

    const fontOptions = [
        {label: 'Times New Roman', value: 'Times New Roman'},
        {label: 'Arial', value: 'Arial'},
        {label: 'Georgia', value: 'Georgia'},
        {label: 'Cursive', value: 'Cursive'},
        {label: 'Calibri' , value: 'Calibri'},
        {label: 'Tangerine', value: 'Tangerine'}
    ]  

    const renderLabel = (componentData, label, type, isPreview = false, isHeader = false) => {
        const sectionLabelStyle = {'min-width': '10rem', 'border': '2px solid #004990', 'padding': '1rem'}
        const isSectionHeadingForPreview = (type === 'section' && isPreview) ? true : false

        return (
            <>
                {isPreview && isHeader ?
                <div className='flex flex-column'>
                    <div>
                        <div style={{'background': '#004990', 'color': 'white', 'marginBottom': '0.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '0 2rem', padding: '1rem', borderRadius: '1rem'}}>
                            {headerImage[componentData.name]?.url ? 
                            <img src={headerImage[componentData.name].url} style={{alignSelf: 'center'}} width='100px' height='85px' /> 
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
                                <div style={{'background': '#004990', 'color': 'white', 'marginBottom': '0.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '0 2rem', padding: '1rem', borderRadius: '1rem'}}>
                                    {headerImage[componentData.name]?.url ? 
                                    <img src={headerImage[componentData.name].url} style={{alignSelf: 'center'}} width='100px' height='85px' /> 
                                    : 
                                    <div style={{width: '100px', height: '100px'}}></div>
                                    }
                                    <h1 style={{alignSelf: 'center', textAlign: 'center'}}>{label}</h1>
                                    <div style={{width: '100px', height: '100px'}}></div>
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

        if (type === 'signature') {
            const fontValue = fontInputs.find(obj => obj.name === name)

            return (
                <div className='flex flex-column'>
                    <div className='flex'>
                        <InputText name={name} value={inputs[name]} onChange={handleInputChange} style={{fontFamily: fontStyle, fontSize: '1rem', marginRight: '0.25rem'}}/>
                        <Dropdown placeholder='Fonts' name='fonts' value={fontValue?.value} options={fontOptions} onChange={event => handleSignatureChange(event, name, metadata)} />
                    </div>
                    <div>
                        <p style={{border: '2px solid #004990', padding: '0.5rem', marginRight: '0.5rem' , fontFamily: fontStyle}}>{inputs[name]}</p>
                    </div>
                </div>
            )
        }

        return (
            <>
            {createElement(
                componentMapper[type],
                {
                    ...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), 
                    value: type === 'file' ? null : inputs[name], onChange: handleInputChange, 
                    type: type === 'file' ? 'file' : null, multiple: type === 'file' ? true : null
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
        return (
            <div  className='field col-12'>
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
            // console.log('metadata(renderComp):', metadata)
            const { type, subtitle, label, subtitleComponent, name, defaultValue, fontStyle, ...rest } = metadata
            return (
                <Sortable key={index} id={index + 1}> {/* index + 1 */}
                    {renderInputField(type, metadata, label, name, rest, subtitle, subtitleComponent, fontStyle)}
                </Sortable>
            )
        }
    }

    const renderTestComponents = (metadata) => {
        
        return (
            <>
                {metadata.map(component => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = component
                    return (
                        <>
                            <Sortable key={component.id} id={component.id}>
                                {renderInputField(type, component, label, name, rest, subtitle, subtitleComponent)}
                            </Sortable>
                        </>
                    )
                })}
            </>
        )
    }

    return {renderLabel, renderCreateElements, renderSubtitle, renderErrors, renderInputField, renderComponents, renderTestComponents}
}