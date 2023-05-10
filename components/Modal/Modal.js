import { Dialog } from 'primereact/dialog';

export function Modal({ header, visible, onHide, children }) {

    return (
        <Dialog header={header} visible={visible} onHide={onHide} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} >
            {children}
        </Dialog>
    )
}

export default Modal