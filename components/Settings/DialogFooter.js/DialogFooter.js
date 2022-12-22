import React from 'react'
import { Button } from 'primereact/button'

export default function DialogFooter({onHide, name}) {
  return (
    <div>
        <Button label='Update' icon='pi pi-check' onClick={() => onHide(name)} autoFocus/>
    </div>
  )
}
