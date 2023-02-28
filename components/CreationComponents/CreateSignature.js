import { useSignatureInputs } from "../../hooks/useSignatureInput"

export const CreateSignature = (type, name, fontStyle) => {
    const { handleSignatureChange, fontInputs } = useSignatureInputs()

    return (
        <div className='flex flex-column'>
            <div className='flex'>
                <InputText name={name} value={inputs[name]} onChange={handleInputChange} style={{fontFamily: fontStyle, fontSize: '1rem', marginRight: '0.25rem'}}/>
            </div>
            <div>
                <p style={{border: '2px solid #004990', padding: '0.5rem', marginRight: '0.5rem' , fontFamily: fontStyle}}>{inputs[name]}</p>
            </div>
        </div>
    )
}