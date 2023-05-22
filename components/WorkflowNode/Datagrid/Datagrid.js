import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { useRouter } from "next/router";
import TextInput from "../../Input/TextInput";
import { FilterMatchMode } from 'primereact/api';


export default function Datagrid({ data, columns, sortable, customColumn }) {

    const router = useRouter()
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    })


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const [currentData, setCurrentData] = useState(data);



    const header = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <TextInput value={globalFilterValue} onChange={onGlobalFilterChange} label="Search here" />
                </span>
            </div>
        )
    }

    const Currentcolumn = (columns) => {
        const cols = columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} sortable={sortable} />
        ))

        cols.push(<Column body={customColumn} header={'Action'} />)

        console.log(cols)

        return cols
    }

    return (
        <DataTable value={currentData} tableStyle={{ minWidth: '50rem' }} header={header} filters={filters} globalFilterFields={['formName', 'submitedBy', 'submitedOn', 'status']} >
            {Currentcolumn(columns)}
        </DataTable>
    )
}