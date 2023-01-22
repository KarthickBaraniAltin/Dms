import cn from 'clsx'
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { MultiSelect } from "primereact/multiselect"
import { createElement, useEffect, useState, useRef } from "react"
import { Sortable } from '../components/DndComponents/Sortable'
import useDialogs from './useDialogs'
import { useInputs } from "./useInput"
import { useValidation } from "./useValidation"
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Droppable } from '../components/DndComponents/Droppable'

export const useFormCreator = () => {

    const [ metadata, setMetadata ] = useState([])
    const { handleInputChange, inputs, setInputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog, hideDialog } = useDialogs({ metadata, setMetadata })

    // These variables are for DND
    const [mainFormIds, setMainFormIds] = useState([])
    const [sectionIds, setSectionIds] = useState([])
    const dragOverCapture = useRef()

    useEffect(() => {
        setMainFormIds(renderComponents().props.children.map(component => component.props.id))

        setSectionIds(metadata.map(component => {
            if (component.type === 'section') {
                return {
                    id: component.name,
                    componentData: component.sectionMetadata.length > 0 ? component.sectionMetadata.map(sectionComponent => sectionComponent.id) : []
                }
            }
        }))
    }, [metadata])

    const componentMapper = {
        'text': InputText,
        'calendar': Calendar,
        'number': InputNumber,
        'textarea': InputTextarea,
        'mask': InputMask,
        'dropdown': Dropdown,
        'multiselect': MultiSelect
    }

    const addMetadata = (data) => {
        setMetadata((prevList) => [...prevList, data])
    }
    
    useEffect(() => {
        metadata.forEach(element => {
            if (element.defaultValue) {
                setInputs(inputs => ({...inputs, [element.name]: element.defaultValue}))
            }
        });    

        
    // Try to remove this warning later
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metadata])

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
        return (
            <>
            {createElement(
                componentMapper[type],
                {...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), value: inputs[name], onChange: handleInputChange}
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

    const renderComponents = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, sectionMetadata, ...rest } = data
                    if (type === 'section') {
                        const sectionNumber = `section-${index + 1}`
                        let sectionIdsForDroppable = sectionIds.find(element => element.id === sectionNumber)
                        sectionIdsForDroppable = sectionIdsForDroppable?.componentData ? sectionIdsForDroppable.componentData : []
                       
                        return (
                            <Sortable key={index} id={index + 1}>
                            <div className='field col-12'>
                                {type.toUpperCase()}
                                {renderDialog()}
                                {renderLabel(data, label, type)}
                                <div>
                                {/* style={{'maxHeight': '175px', 'overflowY': 'scroll'}} */}
                                    <Droppable id={sectionNumber}>
                                            <SortableContext
                                                items={sectionIdsForDroppable}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {createSectionComponents(sectionMetadata)}
                                            </SortableContext>
                                    </Droppable>
                                </div>
                            </div>
                            </Sortable>
                        )
                    }

                    return createComponents(data, index)
                })}
            </>
        )
    }

    const createComponents = (data, index) => {
        const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = data
        return (
            <Sortable key={index} id={index + 1}>
                <div  className='field col-12'>
                {type.toUpperCase()}
                    {renderDialog()}
                    {renderLabel(data, label, type)}
                    {renderCreateElements(type, name, rest)}
                    {renderSubtitle(subtitle, subtitleComponent)}
                    {renderErrors(name)}
                </div>
            </Sortable>
        )
    }

    const createSectionComponents = (metadata) => {
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
                            <div  className='field col-12'>
                            {type.toUpperCase()}
                                {renderDialog()}
                                {renderLabel(data, label, type)}
                                {renderCreateElements(type, name, rest)}
                                {renderSubtitle(subtitle, subtitleComponent)}
                                {renderErrors(name)}
                            </div>
                        </Sortable>
                        </>
                    )
                })}
            </>
        )
    }

    const renderPreview = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    if (data.type === 'section') {
                        const {label, type, sectionMetadata } = data
                        return (
                            <>
                                {renderLabel(null, label, type, true)}
                                {sectionMetadata.map((section, sectionIndex) => {
                                    const { type, name, label, subtitle, ...rest } = section
                                    return (
                                        <div className='field col-12' key={sectionIndex}>
                                            {renderLabel(null, label, type, true)}
                                            {renderCreateElements(type, name, rest)}
                                            {renderSubtitle(subtitle, null)}
                                        </div>
                                    )
                                })}
                            </>
                        )
                    }

                    const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = data
                    return (
                        <div key={index} style={{marginTop: '1rem'}}>
                            <div  className='field col-12'>
                                {renderDialog()}
                                {renderLabel(null, label, type, true)}
                                {renderCreateElements(type, name, rest)}
                                { subtitleComponent }
                                { subtitle && 
                                    <small className='block'>{subtitle}</small>
                                }
                                {renderErrors(name)}
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    return { renderComponents, addMetadata, metadata, setMetadata, renderPreview, mainFormIds, setMainFormIds, sectionIds, setSectionIds, dragOverCapture }
}