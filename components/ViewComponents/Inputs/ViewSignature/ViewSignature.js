import { useSignatureInputs } from '../../../../hooks/useSignatureInput'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import Label from '../../../SharedComponents/Label/Label'
import Errors from '../../../SharedComponents/Errors/Errors'

import styles from '../../../../styles/Inputs/Inputs.module.css' 
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewSignature ({metadata, value, onChange, errors }) {
    const { name, label, subtitle } = metadata
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
        <div className='field grid grid-nogutter'>
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div className='grid grid-nogutter col-8'>
                <InputText className={`col-8 ${styles.input}`} name={name} value={value} onChange={onChange} style={{ fontSize: '1rem'}}/>
                <Dropdown className='col-4' placeholder='Fonts' name='fonts' value={fontValue?.value} options={fontOptions} onChange={event => handleSignatureChange(event, name, metadata)} />
            </div>
            <Errors errors={errors} />
        </div>
    )
}