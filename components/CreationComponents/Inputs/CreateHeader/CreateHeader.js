import NextImage from 'next/image'
import { Resizable } from 're-resizable'
import React, { useEffect, useState } from 'react'

import styles from '../CreateImage/CreateImage.module.css'

export default function CreateHeader({metadata, openDialog, assignValuesNested, guid, value, setFiles, setInputs, setMetadata}) {
  const { name, label, subtitle, width, height, aspectRatio, file } = metadata

  useEffect(() => {
    const fetchImage = async () => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_FORM_BUILDER_API}/FormMetadata/file/${file.guid}` // Update this URL to the actual API endpoint
            const response = await fetch(apiUrl)
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`)
            }
        
            const blob = await response.blob()
            const reader = new FileReader()
        
            reader.onloadend = () => {
                setInputs(prevInputs => ({ ...prevInputs, [name]: reader.result }));
            }
        
            reader.readAsDataURL(blob)
          } catch (error) {
            console.error("Error fetching image:", error)
          }
    }

    if (file) {
        fetchImage()
    }
  }, [])

  const updateMetadata = (width, height, aspectRatio = aspectRatio) => {
    setMetadata((prevMetadata) => {
        const currentComponentData = prevMetadata[guid] || {}
        const updatedComponentData = {
          ...currentComponentData,
          width: width,
          height: height,
          aspectRatio: aspectRatio
        }

        return {
          ...prevMetadata,
          [guid]: updatedComponentData,
        }
    })
  }

  const handleResize = (event, direction, ref, delta) => {
    // const newAspectRatio = lockAspectRatio ? aspectRatio : height / width
    updateMetadata(ref.style.width, ref.style.height, aspectRatio)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    
    setFiles((prevFiles) => ({
        ...prevFiles,
        [event.target.name]: file,
    }))

    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            assignValuesNested(name, e.target.result)

            const img = new Image()
            img.src = e.target.result
            img.onload = () => {
                const aspectRatio = width / height                  
                updateMetadata('100%', '100%', aspectRatio)
            }
        }
        reader.readAsDataURL(file)
    }
  }

  return (
    <div className='flex flex-column'>
        <div>
            <div>
            <input className='col-12 mt-1 mb-2' name={guid} type='file' accept="image/jpeg,image/png"  multiple={false} onChange={handleImageUpload} />                
            {value &&
                <Resizable 
                    size={{width, height}}
                    onResizeStop={handleResize}                      
                    lockAspectRatio={true}   
                    maxWidth={'100%'}
                    minWidth={40}
                    enable={{
                        right: true,
                    }}
                    defaultSize={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    {// eslint-disable-next-line @next/next/no-img-element
                        <div className={styles.imageWrapper}>
                            <NextImage src={value ?? image} alt="Uploaded" fill />                    
                        </div>
                    }
                </Resizable>
            }
            <h3>label</h3>
            </div>
        </div>
    </div>
  )
}
