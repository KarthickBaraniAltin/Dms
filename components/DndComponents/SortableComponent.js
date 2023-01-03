import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'

export function SortableComponent({ id, children }) {
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
        border: '2px solid #004990',
        padding: '1rem',
        marginBottom: '0.2rem'
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