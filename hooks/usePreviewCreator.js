import { useRenderItems } from "./useRenderItems"

export const usePreviewCreator = ({ metadata }) => {

    const {renderLabel, renderCreateElements, renderSubtitle, renderErrors } = useRenderItems({ metadata })

    const renderPreview = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    if (data.type === 'header') {
                        const { label, type, name, ...rest } = data
                        return (
                            <div key={index}>
                                {renderLabel(null, label, type, null, true)}
                            </div>
                        )
                    }

                    if (data.type === 'section') {
                        const { label, type, sectionMetadata } = data
                        return (
                            <>
                                {renderLabel(null, label, type, true)}
                                {sectionMetadata.map((section, sectionIndex) => {
                                    const { type, name, label, subtitle, ...rest } = section
                                    return (
                                        <div className='field col-12' key={sectionIndex}>
                                            {renderLabel(null, label, type, true)}
                                            {renderCreateElements(type, name, rest)}
                                            {renderSubtitle(subtitle, null)}
                                        </div>
                                    )
                                })}
                            </>
                        )
                    }

                    const { type, subtitle, label, subtitleComponent, name, defaultValue, fontStyle, ...rest } = data
                    return (
                        <div key={index} style={{marginTop: '1rem'}}>
                            <div  className='field col-12'>
                                {renderLabel(null, label, type, true)}
                                {renderCreateElements(type, name, rest, fontStyle, data)}
                                { subtitleComponent }
                                { subtitle && 
                                    <small className='block'>{subtitle}</small>
                                }
                                {renderErrors(name)}
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    return { renderPreview }
}