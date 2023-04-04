import { MultiSelect } from 'primereact/multiselect'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

import sharedStyles from '../../../../styles/Inputs/Inputs.module.css'

export default function CreateMultiSelect({metadata, openDialog, value, onChange, errors}) {
  const { name, className, label, subtitle, options, defaultValue } = metadata

  return (
    <div className='field grid grid-nogutter'>
        <SettingsButton openDialog={openDialog} componentData={metadata} />
        <div className='col-4'>
          <Label label={label} />
          <Subtitle subtitle={subtitle} />
        </div>
        <MultiSelect name={name} className={`col-8 ${sharedStyles.input}`} value={value ?? defaultValue} onChange={onChange} options={options} display='chip' />        
        <Errors errors={errors} />
    </div>
  )
}
