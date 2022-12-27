import cn from 'clsx'
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { MultiSelect } from "primereact/multiselect"
import { createElement, useEffect, useState } from "react"
import { useInputs } from "./useInput"
import { useValidation } from "./useValidation"
import { SortableComponent } from "../components/DndComponents/SortableComponent"

// Giving default value to time date component with Date.Now() ? 

export const useDndFormCreator = () => {

    const [metadata, setMetadata] = useState([])
    const { handleInputChange, inputs, setInputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })

    const addMetadata = (data) => {
        setMetadata((prevList) => [...prevList, data])
    }
    
    useEffect(() => {
        metadata.forEach(element => {
            if (element.defaultValue) {
                setInputs(inputs => ({...inputs, [element.name]: element.defaultValue}))
            }
        });    
    
    // Try to remove this warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const renderComponents = () => {
        return (
            <>
                {metadata.map(({ type, subtitle, label, subtitleComponent, name, defaultValue, id, ...rest }, index) => {
                    
                    return (
                    <SortableComponent key={index} id={index + 1} className='field col-12'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>{label}</label> 
                        {createElement(
                            componentMapper[type],
                            {...rest, name, className: cn(errors[name] && 'p-invalid'), value: inputs[name], onChange: handleInputChange}
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
                    </SortableComponent>
                )})}
            </>
        )
    }

    return { renderComponents, addMetadata, metadata, setMetadata }
}