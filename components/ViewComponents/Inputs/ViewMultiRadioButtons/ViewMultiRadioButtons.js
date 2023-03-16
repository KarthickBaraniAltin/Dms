import { RadioButton } from 'primereact/radiobutton'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewMultiRadioButtons ({ metadata, onChange, errors }) {
    const { name, label, subtitle, options } = metadata
    const [checkedValue, setCheckedValue] = useState()

    return (
        <div style={{display: 'flex', justifyContent: 'center', columnGap: '0.5rem', width: '198.4px'}}>
            <div>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div className='col-8'>
                {options.length > 0 ? 
                    <>
                        {options.map((radioButton, index) => {
                            return (
                                <div key={index} style={{marginBottom: '0.5rem'}}>
                                    <RadioButton value={radioButton.value} name={name} 
                                    onChange={(e) => {
                                        setCheckedValue(e.target.value)
                                        onChange(e)
                                    }} 
                                    checked={checkedValue === radioButton.value} 
                                    style={{marginRight: '0.5rem'}} />
                                    <label>{radioButton.value}</label>
                                </div>
                            )
                        })}
                    </>
                    : <p>{'Click dialog to add radiobuttons'}</p>
                }
            </div>
            <Errors errors={errors} />
        </div>
    )
}