import { InputText } from "primereact/inputtext"


export function TextInput(props) {
    return (
        <>
            <span className="p-float-label my-5 w-full">
                <InputText {...props} />
                <label htmlFor={props.id} className={`w-full ${props.className}`} >{props.label}</label>
            </span>
        </>
    )
}

export default TextInput