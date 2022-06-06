import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';


import MaterialTable from 'material-table'
import tableIcons from './../tableIcons'


const useStyles = makeStyles(() => ({
    root: {}
}));

const MaterialTableExprotItemList = props => {
    const { className, ...rest } = props;
    
    return (
        <div>
            <MaterialTable
            style={{ width: '100%', margin: 5, overflowX: "scroll" }}
            icons={tableIcons}
            title=""
            columns={[
                { title: 'item', field: 'item' },
                { title: 'เลขที่ใบขนสินค้า', field: 'doc_hdr' },
                { title: 'ref. doc number', field: 'ref_num' },
                { title: 'qty', field: 'item_qty' },
            ]}

            data={props.ExportItemList}
            options={{
                search: false,
                paging: false,
                maxBodyHeight: '45vh',
                minBodyHeight: '45vh',
                filtering: false,
            }}
        />
        </div>
        
    );
};

MaterialTableExprotItemList.propTypes = {
    className: PropTypes.string
};

export default MaterialTableExprotItemList;
