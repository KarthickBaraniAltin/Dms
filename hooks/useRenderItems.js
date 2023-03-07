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
import LexicalEditor from '../components/LexicalEditor/LexicalEditor'
import ReadonlyLexicalEditor from '../components/LexicalEditor/ReadonlyLexicalEditor/ReadonlyLexicalEditor'
import { CreateSignature } from '../components/CreationComponents/CreateSignature/CreateSignature'
import { ViewSignature } from '../components/ViewComponents/ViewSignature/ViewSignature'
import { CreateMultiRadioButtons } from '../components/CreationComponents/CreateMultiRadioButtons/CreateMultiRadioButtons'
import { CreateCheckbox } from '../components/CreationComponents/CreateCheckbox/CreateCheckbox'
import CreateHeader from '../components/CreationComponents/CreateLabel/CreateLabel'
import CreateLabel from '../components/CreationComponents/CreateLabel/CreateLabel'
import Label from '../components/SharedComponents/Label/Label'
import Image from 'next/image'

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
        'file': CreateHeader,
        'richText': LexicalEditor,
        'subtitle': 'div',
        'signature': CreateSignature,
        'signatureDisplay': ViewSignature,
        'radiobutton': CreateMultiRadioButtons,
        'checkbox': CreateCheckbox
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
                            <Image alt="image" src={headerImage[componentData.name].url} style={{alignSelf: 'center'}} width='100' height='100' /> 
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
                <Label label={label} />
                :
                isHeader ?
                <>
                    <div className='flex flex-column'>
                        <i className='pi pi-cog' style={{fontSize: '1em', alignSelf: 'flex-end', marginBottom: '0.25rem'}} onClick={() => openDialog(componentData)}></i>
                        <div>
                            {/* <CreateHeader componentData={componentData} openDialog={openDialog} /> */}
                            <div>
                                <div style={{'border': '1px #004990 solid', 'color': 'black', 'marginBottom': '0.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '0 2rem', padding: '1rem', borderRadius: '1rem'}}>
                                    {headerImage[componentData.name]?.url ? 
                                    <Image alt="image" src={headerImage[componentData.name].url} style={{alignSelf: 'center'}} width='100' height='100' /> 
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
                    <CreateLabel componentData={componentData} label={label} openDialog={openDialog} />
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
                        ...rest, 
                        name, 
                        className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), 
                        value: type === 'file' ? null : inputs[name],
                        onChange: handleInputChange, 
                        type: type === 'file' ? 'file' : null, 
                        multiple: type === 'file' ? true : null, 
                        metadata: type === 'signatureDisplay' || type === 'radiobutton' || type === 'checkbox' ? metadata : null, 
                    }
                )}
            </>
        )
    }

    const renderSubtitle = (subtitle) => {
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