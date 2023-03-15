import React from 'react'

export default function SettingsButton({openDialog, componentData}) {
  return (
    <div className='col-12 flex justify-content-end'>
      <i className='pi pi-cog mb-1' style={{fontSize: '1em'}} onClick={() => openDialog(componentData)}></i>
    </div>
  )
}
