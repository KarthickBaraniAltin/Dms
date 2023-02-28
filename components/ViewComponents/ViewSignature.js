import { useSignatureInputs } from "../../hooks/useSignatureInput"
import { useInputs } from "../../hooks/useInput"

export const ViewSignature = (metadata, name, fontStyle) => {
    const { inputs, handleInputChange } = useInputs({})
    const { handleSignatureChange, fontInputs } = useSignatureInputs()
    const fontValue = fontInputs.find(obj => obj.name === name)

    const fontOptions = [
        {label: 'Times New Roman', value: 'Times New Roman'},
        {label: 'Arial', value: 'Arial'},
        {label: 'Georgia', value: 'Georgia'},
        {label: 'Cursive', value: 'Cursive'},
        {label: 'Calibri' , value: 'Calibri'},
        {label: 'Tangerine', value: 'Tangerine'}
    ]

    return (
        <div className='flex flex-column'>
            <div className='flex'>
                <InputText name={name} value={inputs[name]} onChange={handleInputChange} style={{fontFamily: fontStyle, fontSize: '1rem', marginRight: '0.25rem'}}/>
                <Dropdown placeholder='Fonts' name='fonts' value={fontValue?.value} options={fontOptions} onChange={event => handleSignatureChange(event, name, metadata)} />
            </div>
            <div>
                <p style={{border: '2px solid #004990', padding: '0.5rem', marginRight: '0.5rem' , fontFamily: fontStyle}}>{inputs[name]}</p>
            </div>
        </div>
    )
}