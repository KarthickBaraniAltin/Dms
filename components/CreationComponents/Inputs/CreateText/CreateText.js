import { InputText } from 'primereact/inputtext'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

import styles from '../../../../styles/Inputs/Inputs.module.css'

export default function CreateText({metadata, value, onChange, openDialog, errors}) {  
  const { name, className, label, subtitle, guid, id, page } = metadata

  return (
    <div className='field grid grid-nogutter'>
      <SettingsButton openDialog={openDialog} componentData={metadata} />
      <div className='col-4'>
        <Label label={label} />       
        <Subtitle subtitle={subtitle} />
      </div>
      <InputText name={name} className={`col-8 ${styles.input}`} autoComplete='off' value={value} onChange={onChange} />
      <Errors errors={errors} />
    </div>
  )
}
