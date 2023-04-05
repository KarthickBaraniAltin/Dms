import React from 'react'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewImage({metadata, value}) {
    const { name, label, subtitle } = metadata

    return (
        <>
            <div className='field grid grid-nogutter'>
                <div className='col-12'>
                    <Label label={label} />
                </div>
                <input className='col-12 mt-1' name={name} type='file' multiple={false} onChange={handleImageUpload} />                
                <Subtitle subtitle={subtitle} />
            </div>
        </>
    )
}
