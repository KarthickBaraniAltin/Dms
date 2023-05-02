import React from 'react'

import styles from '../SettingsButton/SettingsButton.module.css'

export default function SettingsButton({openDialog, componentData}) {
  return (
    <div className='col-12 flex justify-content-end'>
      <i className={`pi pi-cog ${styles.settings}`} onClick={() => openDialog(componentData)}></i>
    </div>
  )
}
