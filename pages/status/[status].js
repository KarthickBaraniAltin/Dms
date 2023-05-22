import { useRouter } from "next/router";
import Datagrid from "../../components/WorkflowNode/Datagrid/Datagrid";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function Status() {

    const router = useRouter()
    const data = [
        {
            id: 1,
            formName: 'job request form',
            submitedBy: 'karthick',
            submitedOn: '11-5-2023',
            status: 'Completed',

        },
        {
            id: 2,
            formName: 'job request form',
            submitedBy: 'Chandra',
            submitedOn: '14-5-2023',
            status: 'Review in',

        },
        {
            id: 3,
            formName: 'job request form',
            submitedBy: 'Guna',
            submitedOn: '12-5-2023',
            status: 'Review in',

        }
    ]
    const columns = [
        { field: 'id', header: 'Id' },
        { field: 'formName', header: 'Form Name' },
        { field: 'submitedBy', header: 'Submited By' },
        { field: 'submitedOn', header: 'Submited On' },
        { field: 'status', header: 'Status' }
    ]

    const actionButton = () => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded text aria-label="Edit" onClick={
                    () => {
                        router.push('/view/2a681111-3fff-4130-9884-3a439fac0026/form-data/645bb498e053652163682ad6')
                    }
                } />
                <Button icon="pi pi-eye" rounded text aria-label="view" />
            </>
        )
    }


    return (
        <>
            <Card title={router.query.status.toUpperCase()} className="my-4 h-full p-2">
                <Datagrid data={data} columns={columns} sortable={true} customColumn={actionButton} />
            </Card>
        </>
    )
}