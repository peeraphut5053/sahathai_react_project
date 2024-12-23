import React, { useState } from 'react';
import {
  Grid,
  Modal,
} from '@material-ui/core';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from '../../../components/table/tableIcons';
import customStyles from './customStyles.js';
import moment from 'moment';
import { Chip } from '@material-ui/core';
import API from 'src/views/components/API';
import { useEffect } from 'react';

const useStyles = customStyles;
const ModalMachineRecord = ({values, openModal,handleCloseModal }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const loadFinishingReason = async (type) => {
    const response = await API.get("RPT_QC_Lab_Tag_Detail/data.php", {
      params: {
        load: "MachineReport",
        StartDate: values.startdate,
        EndDate: values.enddate,
        w_c: values.w_c,
        type: type
      }
    });

    const newData = response.data.map((item) => ({
      ...item,
      start_date:moment(item.start_date?.date).format('DD/MM/YYYY HH:mm:ss'),
      end_date: item.end_date?.date ? moment(item.end_date?.date).format('DD/MM/YYYY HH:mm:ss') : '',
    }));

   setData(newData);
  };

  useEffect(() => {
      if (openModal) {
        loadFinishingReason(1);
      }
  }, [openModal]);
  
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Grid
          container
          spacing={1}
          className={classes.paperModal}
          style={{
            width: '80vw',
            height: '98vh',
            marginLeft: '10vw',
            marginTop: '1vh'
          }}
        >
          <MaterialTable
            style={{ width: '98%', margin: '0%', overflowX: 'scroll' }}
            icons={tableIcons}
            title={`รายงานปรับเปลี่ยนสถานะเครื่อง : ${values.w_c}`}
            selectable={true}
            columns={[
              {
                title: 'Work Center',
                field: 'wc',
                type: 'text',
              },
              {
                title: 'วันที่เริ่มต้น',
                field: 'start_date',
                type: 'datetime',
              },
              {
                title: 'วันที่สิ้นสุด',
                field: 'end_date',
                type: 'datetime',
              },
            ]}
            data={data}
            options={{
              search: false,
              paging: false,
              maxBodyHeight: '80vh',
              minBodyHeight: '80vh',
              exportButton: true,
              filtering: false,
              rowStyle: (rowData) => ({
                fontSize: 12,
                padding: 0
              }),
            }}
            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{ padding: '0px 10px' }}>
                    <Chip
                      label="แสดงทุก Work Center"
                      color="default"
                      style={{ marginRight: 5 }}
                      onClick={() => loadFinishingReason(2)}
                    />
                  </div>
                </div>
              )
            }}
          />
        </Grid>
      </Modal>
    </>
  );
};

export default ModalMachineRecord;
