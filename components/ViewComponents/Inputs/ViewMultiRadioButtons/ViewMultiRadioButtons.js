import { RadioButton } from 'primereact/radiobutton'
import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import ComponenentContainer from '../../../SharedComponents/ComponentContainer/ComponentContainer'
import LabelContainer from '../../../SharedComponents/LabelContainer/LabelContainer'
import InputsContainer from '../../../SharedComponents/InputsContainer/InputsContainer'

export default function ViewMultiRadioButtons ({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, options, otherOptions, validations, defaultValue } = metadata
    const defaultValueIndex = defaultValue ? defaultValue[0] - 1 : null
    const [checkedValue, setCheckedValue] = useState(value?.id)
    const [otherChecked, setOtherChecked] = useState()
    const [otherOptionInputValue, setOtherOptionInputValue] = useState('')

    const handleOtherOption = (other) => {
        setCheckedValue(other)
        setOtherChecked(true)
        setOtherOptionInputValue('')
    }

    const handleOtherOptionInputValueChange = (value, index) => {
        setOtherOptionInputValue(value)

        const eventObject = {
            target: {
                name: name,
                value: value
            }
        }

        onChange(eventObject)
    }

    return (
        <ComponenentContainer>
            <LabelContainer>
                <Label label={label} validations={validations} />
            </LabelContainer>
            <InputsContainer>
                {(options.length > 0 || otherOptions.length > 0) &&
                    <>
                        {options.map((radioButton, index) => {
                            return (
                                <div className='mt-1' key={index}>
                                    <RadioButton 
                                        value={radioButton.value} 
                                        name={name} 
                                        onChange={() => {
                                            setCheckedValue(radioButton.value)
                                            setOtherChecked(null)
                                            onChange({target: { name: name, value: radioButton.value } })
                                        }} 
                                        checked={checkedValue ? checkedValue == radioButton.value : defaultValue === radioButton.value} 
                                        style={{marginRight: '0.5rem'}} 
                                    />
                                    <label>{radioButton.value}</label>
                                </div>
                            )
                        })}
                        {otherOptions &&
                            <div className='mt-1' key={options.length + 1}>
                                <RadioButton
                                    value={otherOptionInputValue}
                                    name={name}
                                    onChange={() => handleOtherOption(otherOptionInputValue)}
                                    checked={otherChecked}
                                />
                                <label> Other:</label>
                                {otherChecked &&
                                    <InputText className='col-12 mt-2' value={otherOptionInputValue} onChange={(e) => handleOtherOptionInputValueChange(e.target.value)}  />
                                }
                            </div>
                        }
                    </>
                }
                <Subtitle subtitle={subtitle} />
                <Errors errors={errors} />
            </InputsContainer>
        </ComponenentContainer>
    )
}