import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { MultiSelect } from "primereact/multiselect"
import { createElement, useState, useEffect } from "react"
import Input from "../components/Input/Input"

export const useFormCreator = () => {

    const [metadata, setMetadata] = useState([])

    const addMetadata = (data) => {
        setMetadata((prevList) => [...prevList, data])
    }
    
    const componentMapper = {
        'text': InputText,
        'calendar': Calendar,
        'number': InputNumber,
        'textArea': InputTextarea,
        'mask': InputMask,
        'dropdown': Dropdown,
        'multiselect': MultiSelect
    }

    const renderComponents = () => {
        metadata.map(({ type, ...rest } ,index) => (
            console.log('Rest = ', rest)
        ))
        return (
            <>
                {metadata.map(({ type, ...rest } ,index) => (
                    <div key={index} className='field col-12'>
                        {createElement(
                            componentMapper[type],
                            {label: 'Test'}
                        )}
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

    return { renderComponents, addMetadata, metadata }
}