import React from 'react'

export default function Errors({errors}) {
    return (
        <>
            {errors && 
                <div className='col-12 mt-3' style={{padding: '0'}}>
                    {  errors?.map(element => {
                            return (
                                <small key={element} className='p-error block'>{element}</small> 
                            )
                        })
                    }
                </div>
            }
        </>
    )
}
