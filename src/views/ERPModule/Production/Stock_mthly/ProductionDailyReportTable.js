import React from 'react';
import DataTable from 'src/components/DataTable';


const ProductionDailyReportTable = (props) => {
    const columns = [
        { title: 'Create Date', field: 'CreateDateCov.date', editable: 'never', type: 'datetime' },
        { title: 'Lot', field: 'lot', editable: 'never' },
        { title: 'trans type', field: 'trans_type', editable: 'never' },
        { title: 'ref type', field: 'ref_type', editable: 'never' },
        { title: 'item', field: 'item', editable: 'never' },
        { title: 'qty', field: 'qty', editable: 'never', type: 'numeric' },
        { title: 'wc', field: 'wc', editable: 'never' },
        { title: 'loc', field: 'loc', editable: 'never' },
        { title: 'sts_no', field: 'sts_no', editable: 'never' },
    ];

    const rowStyle = () => ({
        fontSize: 12,
        padding: 0
    });
    
    return (

        <DataTable
            setdata={props.setdata}
            title={
                `
                Production Daily Report (${props.data.length} รายการ)
                `}
            isLoading={props.isLoading}
            columns={columns}
            data={props.data}
            maxBodyHeight="55vh"
            search={false}
            sorting
            exportButton
            exportFileName="production-daily-report.csv"
            rowStyle={rowStyle}

        />
    );
};

export default ProductionDailyReportTable;
