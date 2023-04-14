import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'
import ComponenentContainer from '../../../SharedComponents/ComponentContainer/ComponentContainer'
import LabelContainer from '../../../SharedComponents/LabelContainer/LabelContainer'
import InputsContainer from '../../../SharedComponents/InputsContainer/InputsContainer'

export default function CreateMultiRadioButtons ({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, options, otherOptions, defaultValue } = metadata
    const defaultValueIndex = defaultValue ? defaultValue[0] - 1 : null
    
    const [checkedValue, setCheckedValue] = useState()
    const [otherChecked, setOtherChecked] = useState()
    const [otherOptionInputValue, setOtherOptionInputValue] = useState('')

    const handleOtherOption = (index) => {
        setCheckedValue(index + options.length + 1)
        setOtherChecked(index + options.length + 1)
        setOtherOptionInputValue('')
    }

    const handleOtherOptionInputValueChange = (value) => {
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
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <LabelContainer>
                <Label label={label} />
            </LabelContainer>
            <InputsContainer>
                {options.length > 0 || otherOptions.length > 0 ? 
                    <>
                        {options.map((radioButton, index) => {
                            return (
                                <div className='mt-1' key={index}>
                                    <RadioButton
                                        value={radioButton.value} 
                                        name={name} 
                                        onChange={(e) => {
                                            setCheckedValue(index)
                                            setOtherChecked(null)
                                            onChange(e)
                                        }} 
                                        checked={checkedValue ? checkedValue === index : index === defaultValueIndex}
                                        style={{marginRight: '0.5rem'}}
                                    />
                                    <label>{radioButton.value}</label>
                                </div>
                            )
                        })}
                        {otherOptions.map((radioButton, index) => {
                            return (
                                <div className='mt-1' key={index + options.length + 1}>
                                    <RadioButton 
                                        value={radioButton.value}
                                        id={index + options.length + 1}
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
                                        <InputText className='col-12 mt-2' value={otherOptionInputValue} onChange={(e) => handleOtherOptionInputValueChange(e.target.value)}  />
                                    }
                                </div>
                            )
                        })}
                    </>
                    : <p>{'Click dialog to add radiobuttons'}</p>
                }
                <Subtitle subtitle={subtitle} />
                <Errors errors={errors} />
            </InputsContainer>
        </ComponenentContainer>
    )
}