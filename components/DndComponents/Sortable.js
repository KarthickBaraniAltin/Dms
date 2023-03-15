import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import clsx from "clsx"

export function Sortable({ id, children, className }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // border: '2px groove #004990',
        // borderRadius: '10px',
        padding: '1rem',
        // 'boxShadow': 'inset 0 0 3px 1px rgba(0, 0, 0, 0.5)'
        // margin: '10px'
    }

    const dragHandleStyle = {
        backgroundColor: '#004990',
        border: '0',
        padding: '0.3rem',
        width: '100%'
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {children}
            <button style={dragHandleStyle} {...listeners}></button>
        </div>
    )
}