import NextImage from 'next/image';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'
import 'react-resizable/css/styles.css';
import Label from '../../../SharedComponents/Label/Label';
import '../CreateImage/CreateImage.module.css'
import { Resizable } from 're-resizable';
import { Checkbox } from 'primereact/checkbox';

export default function CreateImage({ metadata, assignValuesNested, setMetadata, guid, value, openDialog, onChange, errors }) {
    console.log("Component Data = ", metadata)
    const { name, label, subtitle, width, height, aspectRatio, lockAspectRatio } = metadata
    const divRef = useRef(undefined)

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

    const handleResize = (width, height) => {
        const newAspectRatio = lockAspectRatio ? aspectRatio : height / width
        updateMetadata(width, height, newAspectRatio)
    }

    // const fitToDiv = (e) => {
    //     const maxWidth = divRef.current.clientWidth
    //     const maxHeight = divRef.current.clientHeight

    //     const curWidth = width
    //     const curHeight = height

    //     let newWidth;
    //     let newHeight;

    //     newWidth = curWidth;
    //     newHeight = curHeight;
        
    //     updateMetadata(newWidth, newHeight, aspectRatio)
    // }

    // useEffect(() => {
    //     // Handler to call on window resize
    //     window.addEventListener('resize', fitToDiv)
    
    //     return () => window.removeEventListener('resize', fitToDiv)
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const handleImageUpload = (event) => {
        const file = event.target.files[0]

        let maxHeight = 300
        let maxWidth = 300
        if (divRef.current) {
            maxWidth = divRef.current.clientWidth
            maxHeight = divRef.current.clientHeight
        }

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                assignValuesNested(name, e.target.result)

                const img = new Image()
                img.src = e.target.result
                img.onload = () => {
                    const width = img.width
                    const height = img.height
                    const aspectRatio = width / height

                    let newWidth = maxWidth;
                    let newHeight = maxHeight;                    
                    
                    if (width < maxWidth && height < maxHeight) {
                        newWidth = width;
                        newHeight = height;
                    } else if (width > height) {
                        newHeight = newWidth / aspectRatio;
                    } else {
                        newWidth = newHeight * aspectRatio;
                    }

                    updateMetadata('100%', '100%', aspectRatio)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    console.log("Width = ", width)
    console.log("Height = ", height)

    return (
        <>
            <div className='field grid grid-nogutter'>
                <SettingsButton openDialog={openDialog} componentData={metadata} />
                <div className='col-12'>
                    <Label label={label} />
                </div>
                <input className='col-12 mt-1' name={name} type='file' multiple={false} onChange={handleImageUpload} />                
                <Subtitle subtitle={subtitle} />
            </div>
            <div ref={divRef}>
                {value &&
                    <Resizable 
                        size={{width, height}}
                        onResizeStop={(e, direction, ref, d) => {
                                handleResize(width + d.width, height + d.height)
                            }
                        }                      
                        lockAspectRatio={lockAspectRatio}   
                        maxWidth={divRef?.current?.clientWidth ?? 1000}
                        minWidth={40}
                        enable={{
                            right: true,
                            bottomRight: true,
                            bottom: true
                        }}
                        
                    >
                        <NextImage src={value} alt="Uploaded" fill sizes='100vw 100vh' />
                    </Resizable>
                }
            </div>
        </>
    )
}
