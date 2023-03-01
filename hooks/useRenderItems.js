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
import LexicalEditor from '../components/LexicalEditor/LexicalEditor'
import ReadonlyLexicalEditor from '../components/LexicalEditor/ReadonlyLexicalEditor/ReadonlyLexicalEditor'

export const useRenderItems = ({ metadata, setMetadata }) => {

    const { handleInputChange, inputs, setInputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata })
    // const { } = useSubtitleEditor({ metadata, setMetadata })

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
        'richText': LexicalEditor,
        'subtitle': 'div',
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

    const renderCreateElements = (type, name, rest) => {
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

    const renderSubtitle = (subtitle, subtitleComponent, index = -1) => {
        return (
            <div className='mt-1'>
                <ReadonlyLexicalEditor value={subtitle} />
            </div>
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

    const renderInputField = (type, data, label, name, rest, subtitle, subtitleComponent, index) => {
        return (
            <>
                <div style={{'display': 'flex', 'justifyContent': 'flex-end'}}>{type.toUpperCase()}</div>
                {renderDialog()}
                {type === 'header' ? renderLabel(data, label, type, null, true) : renderLabel(data, label, type)}
                {renderCreateElements(type, name, rest)}
                {renderSubtitle(subtitle, subtitleComponent, index)}
                {renderErrors(name)}
            </>
        )
    }

    const renderComponents = (metadata, index, isSection = false) => {
        if (isSection) {
            return (
                <>
                    {metadata.map((data, index) => {
                        const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = data
                        if (type === 'section') {
                            return alert('Error: Cannot place section component within another section component.')
                        }
                        return (
                            <>
                                <Sortable key={index} id={`${metadata[index].id}`}>
                                    {renderInputField(type, data, label, name, rest, subtitle, subtitleComponent, index)}
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

    return {renderLabel, renderCreateElements, renderSubtitle, renderErrors, renderInputField, renderComponents, inputs, setInputs}
}