import { $generateHtmlFromNodes } from "@lexical/html"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"


export const HtmlConverterPlugin = () => {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        editor.update(() => {
            console.log('Editor = ', editor)
            const htmlString = $generateHtmlFromNodes(editor, null);
            console.log("HTML = ", htmlString)
        })
    }, [editor])

    return null
}

export default HtmlConverterPlugin