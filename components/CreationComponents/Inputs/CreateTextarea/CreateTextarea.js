import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import SettingsButton from '../../SettingsButton/SettingsButton'
import clsx from 'clsx'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

import textareaStyles from '../../../../styles/Inputs/Textarea.module.css'

export default function CreateTextarea({metadata, value, onChange, openDialog, errors}) {
  const { name, divClassName, className, label, subtitle, options, guid, id, page } = metadata

  return (
    <div className='field grid grid-nogutter mt-3 mb-5'>
      <SettingsButton openDialog={openDialog} componentData={metadata} />
      <div className='col-1-70'>
        <Label label={label} />
        <Subtitle subtitle={subtitle} />
      </div>
      <InputTextarea name={name} autoResize className={clsx('col-10-3', textareaStyles.textareaInput)} value={value} onChange={onChange} />
      <Errors errors={errors} />
    </div>
  )
}
