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

    const [metadatas, setMetadatas] = useState([])

    const addMetadata = (metadata) => {
        setMetadatas((prevList) => [...prevList, metadata])
    }

    // We can implement the additions in here?
    // const addTextInput = () => {
    //     const metadata = () => {

    //     }
    // }
    
    const componentMapper = {
        'text': InputText,
        'calendar': Calendar,
        'number': InputNumber,
        'textArea': InputTextarea,
        'mask': InputMask,
        'dropdown': Dropdown,
        'multiselect': MultiSelect
    }

    // const renderComponents = () => {
    //     metadatas.forEach((metadata) => {
    //         const { type, ...rest } = metadata
    //         return createElement(
    //             componentMapper[type],
    //             ...rest
    //         )
    //     })
    // }

    console.log('Metadatas = ', metadatas)

    const renderComponents = () => {
        return (
            <>
                {metadatas.map(({ type, inputProps, label, subtitleComponent, subtitle }, index) => (
                    <div key={index} className='field col-12 md:col-12'>
                        <Input 
                            type={type}
                            inputProps={inputProps}
                            label={label}
                            subtitleComponent={subtitleComponent}
                            subtitle={subtitle}
                        />
                    </div>  
                ))}
            </>
        )
    }

    return { renderComponents, addMetadata }
}