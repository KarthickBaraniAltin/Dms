import React from 'react'
import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import Image from 'next/image'
import DraggableStyles from './Draggable.module.css'
import RightArrow from '../../../public/images/icons/right-arrow.png'
 
export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: { // This optional property is how the metadata of the component is transferred to the main form panel.
        ...props
    }
  })

  const componentTypes = [
    'header',
    'image',
    'text',
    'textarea',
    'richText',
    'calendar',
    'time',
    'number',
    'file',
    'dropdown',
    'multiselect',
    'radiobutton',
    'checkbox',
    'mask',
    'subtitle',
    'signature',
  ]

  let image = '/../../../public/images/icons/form_builder_images/'

  const componentImages = [
    'work-in-progress.png',
    'icons8-picture-48.png',
    'work-in-progress.png',
    'text-editor.png',
    'rich.png',
    'calendar.png',
    'icons8-numbers-48.png',
    'icons8-upload-document-48.png',
    'work-in-progress.png',
    'work-in-progress.png',
    'menu.png',
    'icons8-signature-48.png'
  ]

  componentTypes.map((type, index) => {
    if (props.type === type) {
      image += componentImages[index]
    }
  })
  
  const style = {
    transform: CSS.Translate.toString(transform),
  }
  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={DraggableStyles.draggable}>
      {/* <Image src={RightArrow} width={12} height={12} /> */}
      <div>
        {props.children}
      </div>
    </div>
  );
}