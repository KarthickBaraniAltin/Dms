import React from 'react'
import cn from 'clsx'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import { Checkbox } from 'primereact/checkbox'

export default function Input({header, defaultValue, subtitleComponent, subtitle, errorMessages, value, disabled, type, name, label, placeholder, autocomplate,md, onChange, size, required, onInput, min, max, step, errorMessage, inputProps}) {
    
    const rootClassName = ''

    const renderInputComponent = () => {
        if (type === 'text') {
            return (
                <InputText className={cn('block', errorMessages && 'p-invalid', inputProps.className, rootClassName )} {...inputProps} />
            )
        } else if (type === 'calendar') {
            return (
                <Calendar className={cn(errorMessages && 'p-invalid', rootClassName)}  {...inputProps} />
            )
        } else if (type === 'number') {
            return (
                <InputNumber className={cn(errorMessages && 'p-invalid', rootClassName)} autoComplete='off' {...inputProps} />
            )
        } else if (type === 'textarea') {
            return (
                <InputTextarea className={cn(errorMessages && 'p-invalid', rootClassName)} {...inputProps} />
            )
        } else if (type === 'mask') {
            return (
                <InputMask className={cn(errorMessages && 'p-invalid', rootClassName)} {...inputProps} />
            )
        } else if (type === 'dropdown') {
            return (
                <Dropdown className={cn(errorMessages && 'p-invalid', rootClassName)} {...inputProps} />
            )
        } else if (type === 'multiselect') {
            return ( 
                <MultiSelect className={cn(errorMessages && 'p-invalid', rootClassName)} {...inputProps} />
            )
        } else if (type === 'file') {
            // return (
            //     <
            // )
        } else {
            console.error("Unknown input type name")
        }
    }
    
    return (
        <>
            <label className='block' style={{fontWeight: '700', color: '#000000'}}>{label}</label> 
            { renderInputComponent() }
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
        </>
  )
}
