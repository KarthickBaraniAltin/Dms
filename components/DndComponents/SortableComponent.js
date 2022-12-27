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

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    )
}