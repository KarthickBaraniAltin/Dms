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
import { Card } from 'primereact/card'
import { Editor } from '@tinymce/tinymce-react'

export const useRenderItems = ({ metadata, setMetadata }) => {

    const { handleInputChange, inputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata })
    const RICH_TEXT_API = 'eelwd28jheyf9j7bmaahb1ppje583m02314vuj09g0aa7071'

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
        'richtext': Editor,
        'signature': InputText
    }

    const renderLabel = (componentData, label, type, isPreview = false, isHeader = false) => {
        const sectionLabelStyle = {'min-width': '10rem', 'border': '2px solid #004990', 'padding': '1rem'}
        const isSectionHeadingForPreview = type === 'section' && isPreview ? true : false
        return (
            <>
                {isPreview ?
                <label className='block' style={{fontWeight: '700', color: '#000000', textAlign: isSectionHeadingForPreview ? 'center' : null}}>
                    {label}
                </label>
                :
                isHeader ?
                <>
                    <div className='flex flex-column'>
                        <i className='pi pi-cog' style={{fontSize: '1em', alignSelf: 'flex-end', marginBottom: '0.25rem'}} onClick={() => openDialog(componentData)}></i>
                        <Card style={{'background': '#004990', 'color': 'white', 'marginBottom': '0.5rem'}}>
                            <h1 style={{'textAlign': 'center'}}>{label}</h1>
                        </Card>
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
            return (
                <>
                {createElement(
                    componentMapper[type],
                    {
                        ...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), 
                        value: inputs[name], onChange: handleInputChange, apikey: RICH_TEXT_API, initialValue: '<p>Write your description here</p>',
                        height: 200, menubar: false, plugins: [ 'help' ], content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        toolbar: [
                            { name: 'history', items: [ 'undo', 'redo' ] },
                            { name: 'styles', items: [ 'styles' ] },
                            { name: 'formatting', items: [ 'bold', 'italic', 'underline', 'fontFamily', 'fontSize' ] },
                            { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                            { name: 'indentation', items: [ 'outdent', 'indent' ] },
                            { name: 'help', items: [ 'help' ] }
                          ],
                    }
                )}
                </> 
            )
        }

        return (
            <>
            {createElement(
                componentMapper[type],
                {
                    ...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), 
                    value: type === 'file' ? null : inputs[name], onChange: handleInputChange, 
                    type: type === 'file' ? 'file' : null, multiple: type === 'file' ? true : null, style: {fontFamily: fontStyle}
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
                {type === 'header' ? renderLabel(data, label, type, null, true) : renderLabel(data, label, type)}
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