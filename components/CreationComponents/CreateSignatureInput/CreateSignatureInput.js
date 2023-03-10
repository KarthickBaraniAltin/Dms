import { InputText } from 'primereact/inputtext'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateSignatureInput({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata

    return (
        <div>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            <div className='flex flex-column'>
                <div className='flex'>
                    <InputText name={name} value={value} onChange={onChange} style={{fontSize: '1rem', marginRight: '0.25rem'}}/>
                </div>
                <div>
                    <p style={{border: '2px solid #004990', padding: '0.5rem', marginRight: '0.5rem'}}>{value}</p>
                </div>
            </div>
            <CreateSubtitle value={subtitle} />
            <Errors errors={errors} />
        </div>
    )
}