import React from 'react'
import MaterialTable from 'material-table'
import tableIcons from './tableIcons'

function MatTable(props) {

    return (
        <MaterialTable
            style={{ width: '100%', margin: 5, overflowX: "scroll" }}
            icons={tableIcons}
            title={"Quantity Move List : " + props.qtyMoveList.length + " รายการ"}
            columns={[
                { title: 'id', field: 'id' },
                { title: 'lot', field: 'lot', width: 200 },
                { title: 'From loc', field: 'loc', width: 100 },
                { title: 'item', field: 'item', width: 300 },
                { title: 'qty', field: 'qty1', type: 'numeric' },
                { title: 'unit', field: 'u_m' },
            ]}
            data={props.qtyMoveList}
            options={{
                cellStyle: { padding: '0.1' },
                headerStyle: { padding: '0.1' },
                search: false,
                paging: false,
                maxBodyHeight: '50vh',
                minBodyHeight: '50vh',
                rowStyle: rowData => ({
                    // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                    fontSize: 12,
                    padding: 0,
                    width: 500,
                    fontFamily: 'sans-serif'
                  }
                  ),
            }}

            
        />
    )
}

export default MatTable;
