import ReadonlyLexicalEditor from "../components/LexicalEditor/ReadonlyLexicalEditor/ReadonlyLexicalEditor"
import { useRenderItems } from "./useRenderItems"

export const usePreviewCreator = ({ metadata }) => {

    const {renderLabel, renderCreateElements, renderSubtitle, renderErrors, inputs, setInputs } = useRenderItems({ metadata })

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

                    const { type, subtitle, label, subtitleComponent, name, defaultValue, ...rest } = data
                    return (
                        <div className='field md:col-12 mt-1' key={index}>
                            <div>
                                {renderLabel(null, label, type, true)}
                                {renderCreateElements(type, name, rest)}
                                { subtitleComponent }
                                <div className='mt-1'>
                                    <ReadonlyLexicalEditor value={subtitle} />
                                </div> 
                                {renderErrors(name)}
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    return { renderPreview, inputs, setInputs }
}