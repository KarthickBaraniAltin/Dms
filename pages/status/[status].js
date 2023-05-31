import { useRouter } from "next/router";
import Datagrid from "../../components/WorkflowNode/Datagrid/Datagrid";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { axiosGet } from "../../helpers/Axios";
import { useMsal } from "@azure/msal-react";

export default function Status() {

    const { accounts } = useMsal()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const username = accounts.length > 0 ? accounts[0].username : ''

    const router = useRouter()

    const columns = [
        { field: 'formName', header: 'Form Name' },
        { field: 'formSubmittedDate', header: 'Submited On' },
        { field: 'formStatus', header: 'Status' }
    ]

    const actionButton = (data) => {
        console.log('data', data)
        return (
            <>
                <Button icon="pi pi-pencil" rounded text aria-label="Edit" disabled={!data.formStatus === "InReview"} onClick={
                    () => {
                        router.push(`/view/${data.formDefinitionId}/form-data/${data.formDataId}`)
                    }
                } />
                <Button icon="pi pi-eye" rounded text aria-label="view" />
            </>
        )
    }

    useEffect(() => {
        setLoading(true)
        axiosGet(`FormDataPending/${username}`)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch(
                err => console.log(err)
            )
            .finally(() => setLoading(false))

    }, [router.query.status])


    return (
        <>
            <Card title={router.query.status.toUpperCase()} className="my-4 h-full p-2">
                <Datagrid loading={loading} data={data} columns={columns} sortable={true} customColumn={actionButton} />
            </Card>
        </>
    )
}