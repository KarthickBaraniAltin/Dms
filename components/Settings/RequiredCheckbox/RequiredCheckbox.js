import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { useState, useEffect } from 'react'


export default function RequiredCheckbox({inputs, onChange}) {
    const [checkedRequired, setCheckedRequired] = useState(inputs?.validations?.required?.isRequired ?? false)

    const handleCheckboxChange = () => {
        setCheckedRequired(prevState => !prevState)      
    }

    useEffect(() => {
        if (inputs?.validations?.required) {
            if (checkedRequired) {
                inputs.validations.required.isRequired = true
            } else {
                inputs.validations.required.isRequired = false
            }
        }
    }, [checkedRequired])

    return (
        <>
            <div className='mb-2'>
                <label className='mr-2'>Required</label>
                <Checkbox name='validations.required.isRequired' value={inputs?.validations?.required?.isRequired ?? false} onChange={(e) => {
                        onChange(e),
                        handleCheckboxChange()
                    }} checked={checkedRequired}
                />
            </div>
            <label>Optional Message</label>
            <InputText name='validations.required.message' value={inputs?.validations?.required?.message ?? ''} onChange={onChange}/>
        </>

    )
}