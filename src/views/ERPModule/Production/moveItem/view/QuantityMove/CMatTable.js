import React from 'react'
import DataTable from 'src/components/DataTable'

function MatTable(props) {
    const columns = [
        { title: 'id', field: 'id' },
        { title: 'lot', field: 'lot', minWidth: 200 },
        { title: 'From loc', field: 'loc', minWidth: 100 },
        { title: 'item', field: 'item', minWidth: 300 },
        { title: 'qty', field: 'qty1', type: 'numeric' },
        { title: 'unit', field: 'u_m' },
    ].map((column) => ({
        ...column,
        headerStyle: { padding: '0.1' },
        cellStyle: { padding: '0.1' },
    }));

    const rowStyle = () => ({
        fontSize: 12,
        padding: 0,
        width: 500,
        fontFamily: 'sans-serif'
    });

    return (
        <DataTable
            title={"Quantity Move List : " + props.qtyMoveList.length + " รายการ"}
            columns={columns}
            data={props.qtyMoveList}
            maxBodyHeight="50vh"
            search={false}
            sorting
            rowStyle={rowStyle}
        />
    )
}

export default MatTable;
