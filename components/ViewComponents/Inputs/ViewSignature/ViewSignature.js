import { useSignatureInputs } from '../../../../hooks/useSignatureInput'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import Label from '../../../SharedComponents/Label/Label'
import Errors from '../../../SharedComponents/Errors/Errors'

import styles from '../../../../styles/Inputs/Inputs.module.css' 
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewSignature ({metadata, value, onChange, errors }) {
    const { name, label, subtitle, guid, fontStyle, validations } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <div style={{textAlign: 'right', marginRight: '1rem'}}>
                <Label label={label} validations={validations} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div>
                <div className='grid grid-nogutter col-8'>
                    <InputText className={`col-8 ${styles.input}`} name={name} value={value} onChange={onChange} 
                    style={{ fontSize: '1rem', fontFamily: fontStyle, border: errors?.length > 0 ? '1px solid red' : '', 
                    boxShadow: errors?.length > 0 ? '0 0 4px rgba(240, 240, 240, 0.2)': '', borderRadius: errors?.length > 0 ? '4px' : ''}}
                    />
                </div>
                <div className='col-12'>
                    <p style={{border: '2px solid #004990', padding: '0.5rem', marginRight: '0.5rem', fontFamily: fontStyle}}>{value}</p>
                </div>
                <Errors errors={errors} />
            </div>
        </div>
    )
}