import { RadioButton } from 'primereact/radiobutton'
import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewMultiRadioButtons ({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, options, otherOptions, validations, defaultValue } = metadata
    const [checkedValue, setCheckedValue] = useState(value?.id)
    const [otherChecked, setOtherChecked] = useState()
    const [otherOptionInputValue, setOtherOptionInputValue] = useState('')

    const handleOtherOption = (index) => {
        setCheckedValue(index + options.length + 1)
        setOtherChecked(index + options.length + 1)
        setOtherOptionInputValue('')
    }

    const handleOtherOptionInputValueChange = (value, index) => {
        setOtherOptionInputValue(value)

        const eventObject = {
            target: {
                name: name,
                value: {
                    radioButton: value,
                    id: index
                }
            }
        }

        onChange(eventObject)
    }

    return (
        <div className='field grid grid-nogutter'>
            <div style={{textAlign: 'right', marginRight: '1rem'}}>
                <Label label={label} validations={validations} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div>
                <div className='col-8'>
                    {(options.length > 0 || otherOptions.length > 0) &&
                        <>
                            {options.map((radioButton, index) => {
                                return (
                                    <div className='mt-1' key={index}>
                                        <RadioButton 
                                            value={radioButton.value} 
                                            name={name} 
                                            onChange={() => {
                                                setCheckedValue(index)
                                                setOtherChecked(null)
                                                onChange({target: { name: name, value: {radioButton: radioButton.value, id: index} } })
                                            }} 
                                            checked={checkedValue ? checkedValue == index : radioButton.value === defaultValue} 
                                            style={{marginRight: '0.5rem'}} 
                                        />
                                        <label>{radioButton.value}</label>
                                    </div>
                                )
                            })}
                            {otherOptions.map((radioButton, index) => {
                                return (
                                    <div className='mt-1' key={index + otherOptions.length + 1}>
                                        <RadioButton
                                            value={radioButton.value}
                                            name={name}
                                            onChange={() => {
                                                setCheckedValue(index + options.length + 1)
                                                handleOtherOption(index)
                                            }}
                                            checked={checkedValue === index + options.length + 1}
                                            style={{marginRight: '0.5rem'}}
                                        />
                                        <label>{radioButton.value}</label>
                                        {otherChecked === index + options.length + 1 && 
                                            <InputText className='col-12 mt-2' value={otherOptionInputValue} onChange={(e) => handleOtherOptionInputValueChange(e.target.value, index + options.length + 1)}  />
                                        }
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
                <Errors errors={errors} />
            </div>
        </div>
    )
}