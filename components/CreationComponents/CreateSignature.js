import { InputText } from 'primereact/inputtext'

export const CreateSignature = ({name, fontStyle, value, onChange}) => {

    return (
        <div className='flex flex-column'>
            <div className='flex'>
                <InputText name={name} value={value} onChange={onChange} style={{fontFamily: fontStyle, fontSize: '1rem', marginRight: '0.25rem'}}/>
            </div>
            <div>
                <p style={{border: '2px solid #004990', padding: '0.5rem', marginRight: '0.5rem' , fontFamily: fontStyle}}>{value}</p>
            </div>
        </div>
    )
}