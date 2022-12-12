import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { MultiSelect } from "primereact/multiselect"
import { createElement, useEffect, useState } from "react"
import { useInputs } from "./useInput"

// Giving default value to time date component with Date.Now ...

export const useFormCreator = () => {

    const [metadata, setMetadata] = useState([])
    const { handleInputChange, inputs, setInputs } = useInputs({})

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

    console.log('Inputs = ', inputs)

    const renderComponents = () => {
        return (
            <>
                {metadata.map(({ type, subtitle, label, errorMessages, subtitleComponent, name, defaultValue, ...rest }, index) => (
                    <div key={index} className='field col-12'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>{label}</label> 
                        {createElement(
                            componentMapper[type],
                            {...rest, name, value: inputs[name], onChange: handleInputChange}
                        )}
                        { subtitleComponent }
                        { subtitle && 
                            <small className='block'>{subtitle}</small>
                        }
                        { errorMessages && 
                            errorMessages.map(element => {
                                return (
                                    <small key={element} className='p-error block'>{element}</small> 
                                )
                            })
                        }
                    </div>
                ))}
            </>
        )
    }

    console.log('Metadatas = ', metadata)

    // const renderComponents = () => {
    //     return (
    //         <>
    //             {metadata.map(({ type, inputProps, label, subtitleComponent, subtitle, value }, index) => (
    //                 <div key={index} className='field col-12 md:col-12'>
    //                     <Input 
    //                         type={type}
    //                         inputProps={inputProps}
    //                         label={label}
    //                         subtitleComponent={subtitleComponent}
    //                         subtitle={subtitle}
    //                         // value={value}
    //                     />
    //                 </div>  
    //             ))}
    //         </>
    //     )
    // }

    return { renderComponents, addMetadata, metadata, setMetadata }
}