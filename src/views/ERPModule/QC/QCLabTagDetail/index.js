import React, { useState } from 'react';

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';
import moment from 'moment';

const QcLabTagDetail = () => {
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [loading, setLoading] = useState(false);

  const addComma = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const handleSwitch = (event) => {
    if (event.target.checked) {
      removeDuplicate();
    } else {
      setData(oldData);
    }
  };

  const removeDuplicate = () => {
    const unique = data.filter(
      (v, i, a) => a.findIndex((t) => t.lot === v.lot) === i
    );
    setData(unique);
  };

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '10px', textAlign: 'center' }}>
      QC Lab Tag Detail
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  tag_id: '',
                  sts_no: '',
                  StartDate: moment().format('YYYY-MM-DD'),
                  EndDate: moment().format('YYYY-MM-DD'),
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    console.log(values);
                    setSubmitting(true);
                    const response = await API.get(
                      'RPT_QC_Lab_Tag_Detail/data.php',
                      {
                        params: {
                          load: 'ajax',
                          tag_id: values.tag_id,
                          sts_no: values.sts_no,
                          StartDate: values.StartDate,
                          EndDate: values.EndDate
                        }
                      }
                    );

                    if (response.data.length == 0) {
                      toast.error('ไม่พบข้อมูล');
                      setSubmitting(false);
                      return;
                    }

                    const newData = response.data.map((item) => {
                      return {
                        ...item,
                        date: moment(item.date.date).format('YYYY-MM-DD'),
                      };
                    });

                    setData(newData);
                    setOldData(newData);
                    setLoading(false);
                    toast.success('ค้นหาเสร็จสิ้น');
                    setSubmitting(false);
                  } catch (error) {
                    console.log(error);
                    toast.error('เกิดข้อผิดพลาด');
                    setLoading(false);
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid item xs={3}></Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <CTextField
                          error={Boolean(touched.tag_id && errors.tag_id)}
                          helperText={touched.tag_id && errors.tag_id}
                          label="Tag ID"
                          name="tag_id"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.tag_id}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CTextField
                          error={Boolean(touched.sts_no && errors.sts_no)}
                          helperText={touched.sts_no && errors.sts_no}
                          label="STS No"
                          name="sts_no"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.sts_no}
                        />
                      </Grid>
                      <Grid item xs={3}>
                      <DateTimePicker
                          label="วันเวลาเริ่ม"
                          name={'StartDate'}
                          value={values.StartDate}
                          onBlur={handleBlur}
                          onChange={e =>
                            setFieldValue(
                              'StartDate',
                              moment(e).format('YYYY-MM-DD')
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                      <DateTimePicker
                          label="วันเวลาสิ้นสุด"
                          name={'EndDate'}
                          value={values.EndDate}
                          onBlur={handleBlur}
                          onChange={e =>
                            setFieldValue(
                              'EndDate',
                              moment(e).format('YYYY-MM-DD')
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          disabled={loading}
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="meldium"
                        >
                          Search
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
            <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
              <MaterialTable
                icons={tableIcons}
                title={`Tag Status (${data.length} รายการ) `}
                columns={[
                  {
                    title: 'หมายเลขปฏิบัติการ',
                    field: 'qc_oper_num',
                    type: 'string',
                    editable: 'always',
                    render: (rowData) => (
                      <div>
                        <TextField value={rowData.qc_oper_num} />
                      </div>
                    )
                  },
                  {
                    title: 'Item',
                    field: 'item',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Tag ID',
                    field: 'id',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Size',
                    field: 'size',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Schedule',
                    field: 'uf_schedule',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Length',
                    field: 'uf_length',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Standard',
                    field: 'standard',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Grade',
                    field: 'uf_grade',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'STS No',
                    field: 'sts_no',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Coil No',
                    field: 'Coil_No',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Heat No',
                    field: 'Heat_no',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'FM',
                    field: 'FM',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'หนา x กว้าง',
                    field: 'thick',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Date',
                    field: 'date',
                    type: 'date',
                    editable: 'never'
                  }
                ]}
                data={data}
                cellEditable={{
                  onCellEditApproved: (
                    newValue,
                    oldValue,
                    rowData,
                    columnDef
                  ) => {
                    return new Promise((resolve, reject) => {
                      if (columnDef.field === 'qc_oper_num') {
                        API.get(
                          'RPT_QC_Lab_Tag_Detail/data.php',
                          {
                            params: {
                              load: 'update_status',
                              tag_id: rowData.id,
                              qc_oper_num: newValue
                            }
                          }
                        );
                      }
                      // update row data
                      const dataUpdate = [...data];
                      const index = rowData.tableData.id;
                      dataUpdate[index] = { ...rowData, [columnDef.field]: newValue };
                      setData([...dataUpdate]);
                      setTimeout(resolve, 1000);
                    });
                  }
                }}
                options={{
                  exportButton: true,
                  cellStyle: { padding: '0.1' },
                  headerStyle: { padding: '0.1' },
                  maxBodyHeight: '65vh',
                  minBodyHeight: '65vh',
                  search: true,
                  paging: false,
                  sorting: true,
                  filtering: false,
                  exportButton: true,
                  columnsButton: true,
                  doubleHorizontalScroll: true,
                  headerStyle: {
                    backgroundColor: '#039be5',
                    color: '#FFF',
                    textAlign: 'center'
                  },
                  cellStyle: {
                    textAlign: 'center',
                    fontSize: '14px'
                  },
                  
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QcLabTagDetail;
