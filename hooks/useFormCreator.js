import cn from 'clsx'
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { MultiSelect } from "primereact/multiselect"
import { createElement, useEffect, useState } from "react"
import { Sortable } from '../components/DndComponents/Sortable'
import useDialogs from './useDialogs'
import { useInputs } from "./useInput"
import { useValidation } from "./useValidation"
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

export const useFormCreator = () => {

    const [ metadata, setMetadata ] = useState([])
    const { handleInputChange, inputs, setInputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog, hideDialog } = useDialogs({ metadata, setMetadata })

    // These variables are for DND
    const [mainFormIds, setMainFormIds] = useState([])


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
    
    // console.log("Metadata = ", metadata)

    const renderComponents = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = data
                    if (type === 'section-panel') {
                        return (
                            <div className='field col-12' key={index} id={index + 1}>
                                {renderDialog()}
                                <div className="flex justify-content-between" style={{'min-width': '10rem', 'border': '2px solid #004990', 'padding': '1rem'}}>
                                    <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                                        {label}
                                    </label> 
                                    <i className='pi pi-cog' style={{fontSize: '1em'}} onClick={() => openDialog(data)}></i>
                                </div>
                                {/* <SortableContext>

                                </SortableContext> */}
                            </div>
                        )
                    }

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
                })}
            </>
        )
    }

    const renderPreview = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = data
                    if (type === 'section-panel') {
                        return (
                            <div className='field col-12' key={index}>
                                <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                                    {label}
                                </label> 
                            </div>
                        )
                    }

                    return (
                        <div key={index}>
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

    return { renderComponents, addMetadata, metadata, setMetadata, renderPreview, mainFormIds, setMainFormIds }
}