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
import { DndContext } from '@dnd-kit/core'
import { useApi } from './useApi'
import { useMsalAuthentication } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import { formBuilderApiRequest } from '../src/msalConfig'

export const useFormCreator = () => {

    const [ metadata, setMetadata ] = useState([])
    const { handleInputChange, inputs, setInputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog, hideDialog } = useDialogs({ metadata, setMetadata })
    
    // Api call variables
    const { response, error, loading, callApi } = useApi()
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)

    // These variables are for DND
    const [mainFormIds, setMainFormIds] = useState([])
    const [sectionIds, setSectionIds] = useState([])
    const dragOverCapture = useRef()

    useEffect(() => {
        setMainFormIds(renderComponents().props.children.map(component => component.props.id))
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

    const postFormApiCall = async () => {
        const { accessToken } = await acquireToken()

        const params = {
            method: 'POST',
            url: `/form-builder-studio/api/form-definition`,
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`
            }
        }

        await callApi(params)
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
    
    console.log("Response = ", response)
    console.log("Metadata = ", metadata)

    const renderComponents = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, sectionMetadata, ...rest } = data
                    if (type === 'section') {
                        const sectionNumber = `section-${index + 1}`
                        console.log('createSectionComponents:', createSectionComponents(sectionMetadata, sectionNumber))
                        return (
                            <Sortable key={index} id={index + 1}>
                                <div className='field col-12'>
                                {renderDialog()}
                                <div className="flex justify-content-between" style={{'min-width': '10rem', 'border': '2px solid #004990', 'padding': '1rem'}}>
                                    <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                                        {label}
                                    </label> 
                                    <i className='pi pi-cog' style={{fontSize: '1em'}} onClick={() => openDialog(data)}></i>
                                </div>
                                <div>
                                {/* style={{'maxHeight': '175px', 'overflowY': 'scroll'}} */}
                                    <Droppable id={`section-${index + 1}`}>
                                            {/* <SortableContext
                                                items={sectionIds}
                                                strategy={verticalListSortingStrategy}
                                            >

                                            </SortableContext> */}
                                            {createSectionComponents(sectionMetadata, sectionNumber)}
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
                    {renderDialog()}
                    <div className="flex justify-content-between">
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            {label}
                        </label> 
                        <i className='pi pi-cog' style={{fontSize: '1em'}} onClick={() => openDialog(data)}></i>
                    </div>
                    {createElement(
                        componentMapper[type],
                        {...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), value: inputs[name], onChange: handleInputChange}
                    )}
                    { subtitleComponent }
                    { subtitle && 
                        <small className='block'>{subtitle}</small>
                    }
                    { errors[name] && 
                        errors[name].map(element => {
                            return (
                                <small key={element} className='p-error block'>{element}</small> 
                            )
                        })
                    }
                </div>
            </Sortable>
        )
    }

    const renderPreview = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    if (data.type === 'section') {
                        const {label, sectionMetadata } = data
                        return (
                            <>
                                <label className='block' style={{fontWeight: '700', color: '#000000', textAlign: 'center'}}>
                                    {label}
                                </label>
                                {sectionMetadata.map((section, sectionIndex) => {
                                    const { type, name, label, subtitle, ...rest } = section
                                    return (
                                        <div className='field col-12' key={sectionIndex}>
                                            <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                                                {label}
                                            </label> 
                                            {createElement(
                                                componentMapper[type],
                                                {...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), value: inputs[name], onChange: handleInputChange}
                                            )}
                                            { subtitle && 
                                            <small className='block'>{subtitle}</small>
                                            }
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
                                <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                                    {label}
                                </label> 
                                {createElement(
                                    componentMapper[type],
                                    {...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), value: inputs[name], onChange: handleInputChange}
                                )}
                                { subtitleComponent }
                                { subtitle && 
                                    <small className='block'>{subtitle}</small>
                                }
                                { errors[name] && 
                                    errors[name].map(element => {
                                        return (
                                            <small key={element} className='p-error block'>{element}</small> 
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    const createSectionComponents = (metadata, sectionNumber) => {
        return (
            <>
                {metadata.map((data, index) => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = data
                    if (type === 'section') {
                        return alert('Error: Cannot place section component within another section component.')
                    }
                    return (
                        <div key={index} id={`${sectionNumber}_${index + 1}`}>
                            <div  className='field col-12'>
                                {renderDialog()}
                                <div className='flex justify-content-between'>
                                    <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                                        {label}
                                    </label>
                                    <i className='pi pi-cog' style={{fontSize: '1em'}} onClick={() => openDialog(data)}></i>
                                </div>
                                {createElement(
                                    componentMapper[type],
                                    {...rest, name, className: cn(errors[name] && errors[name].length != 0 && 'p-invalid'), value: inputs[name], onChange: handleInputChange}
                                )}
                                { subtitleComponent }
                                { subtitle && 
                                    <small className='block'>{subtitle}</small>
                                }
                                { errors[name] && 
                                    errors[name].map(element => {
                                        return (
                                            <small key={element} className='p-error block'>{element}</small> 
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    return { renderComponents, postFormApiCall, addMetadata, metadata, setMetadata, renderPreview, mainFormIds, setMainFormIds, dragOverCapture }
}