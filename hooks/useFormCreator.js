import cn from 'clsx'
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { MultiSelect } from "primereact/multiselect"
import { createElement, useEffect, useState } from "react"
import TextDialog from '../components/Settings/TextDialog/TextDialog'
import useDialogs from './useDialogs'
import { useInputs } from "./useInput"
import { useValidation } from "./useValidation"

// Giving default value to time date component with Date.Now() ? 

export const useFormCreator = () => {

    const [ metadata, setMetadata ] = useState([])
    const { handleInputChange, inputs, setInputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog, hideDialog } = useDialogs({ metadata, setMetadata })

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
                    return (
                        <div key={index} className='field col-12'>
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
                    )
                })}
            </>
        )
    }

    return { renderComponents, addMetadata, metadata, setMetadata }
}