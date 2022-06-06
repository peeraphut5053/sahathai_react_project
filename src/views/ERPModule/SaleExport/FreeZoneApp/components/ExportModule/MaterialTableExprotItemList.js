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
            {props.ExportItemList.bundle_qty}
            <MaterialTable
            style={{ width: '100%', margin: 5, overflowX: "scroll" }}
            icons={tableIcons}
            title=""
            columns={[
                { title: 'item', field: 'item' },
                { title: 'ref. doc number', field: 'ref_num' },
                { title: 'qty', field: 'bundle_qty' },
            ]}

            data={props.ExportItemList}
            options={{
                search: false,
                paging: false,
                maxBodyHeight: '45vh',
                minBodyHeight: '45vh',
                filtering: true,
            }}
        />
        </div>
        
    );
};

MaterialTableExprotItemList.propTypes = {
    className: PropTypes.string
};

export default MaterialTableExprotItemList;
