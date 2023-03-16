import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import SettingsButton from '../../SettingsButton/SettingsButton'
import clsx from 'clsx'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

import styles from '../CreateTextarea/CreateTextarea.module.css'

export default function CreateTextarea({metadata, value, onChange, openDialog, errors}) {
  const { name, className, label, subtitle, options, guid, id, page } = metadata

  return (
    <div className='field grid grid-nogutter'>
      <SettingsButton openDialog={openDialog} componentData={metadata} />
      <div className='col-2'>
        <Label label={label} />
        <Subtitle subtitle={subtitle} />
      </div>
      <InputTextarea name={name} autoResize className={clsx('col-10', styles['my-textarea'])} value={value} onChange={onChange} />
      <Errors errors={errors} />
    </div>
  )
}
