import { Button } from "primereact/button"
import { memo } from "react"
import { defaultNode, defaultEdge } from '../WorkflowNode/Elements/Elements'
import { axiosPost } from '../../helpers/Axios'
import csnLogo from '../../images/csn.png'

function Navbar({ formName, formId, setNodes, setEdges, nodes, edges, toast }) {

    console.log(csnLogo)

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Saved', life: 3000 })
    }

    const onSave = () => {
        const stringifyData = JSON.stringify({ nodes: nodes, edges: edges })
        const postData = {
            id: self.crypto.randomUUID(),
            form_Id: formId,
            form_Name: formName,
            definition: stringifyData,
            created_By: 'Admin',
            created_On: "2023-04-19T11:08:20.453Z",
            modified_By: 'Admin',
            modified_On: "2023-04-19T11:08:20.453Z"
        }
        console.log(postData)
        axiosPost('WorkflowBuilder', postData)
            .then(() => show())
            .catch(err => console.log('err', err))
    }

    const onReset = () => {
        setNodes([...defaultNode, { ...defaultNode[0], data: { ...defaultNode[0].data, label: formName } }])
        setEdges(defaultEdge)
        localStorage.setItem('dndId', 0)
    }

    return (
        <div className='flex justify-content-between align-items-center p-1 bg-white shadow-1'>
            <img src={csnLogo.src} alt={'CSN Logo'} width={'80px'} height={'25px'} />
            <h2 style={{ color: '#004990' }} >{`Workflow Builder - ${formName}`}</h2>
            <div className='flex gap-2'>
                <Button size={'small'} label='Reset' onClick={onReset} style={{ backgroundColor: '#fffbe5', color: '#ffd200', borderStyle: 'none' }} />
                <Button size={'small'} label='Save' onClick={onSave} style={{ backgroundColor: '#004990', color: '#fff', borderStyle: 'none' }} />
            </div>
        </div>
    )
}

export default memo(Navbar)