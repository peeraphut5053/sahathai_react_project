import React, { useState } from 'react';

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { Formik } from 'formik';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';

const DoInventory = () => {
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
        DO INVENTORY DETAIL REPORT
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  do_num: '',
                  sts_no: '',
                  cust_po: ''
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    console.log(values);
                    setSubmitting(true);
                    const response = await API.get(
                      'RPT_DO_INVENTORY_DETAIL/data.php',
                      {
                        params: {
                          load: 'ajax',
                          do_num: values.do_num,
                          sts_no: values.sts_no,
                          cust_po: values.cust_po
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
                        qty_sts_no2: addComma(item.qty_sts_no2),
                        qty_sts_no3: addComma(item.qty_sts_no3)
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
                      <Grid item xs={3}>
                        <CTextField
                          error={Boolean(touched.do_num && errors.do_num)}
                          helperText={touched.do_num && errors.do_num}
                          label="Do No."
                          name="do_num"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.do_num}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CTextField
                          error={Boolean(touched.sts_no && errors.sts_no)}
                          helperText={touched.sts_no && errors.sts_no}
                          label="STS NO"
                          name="sts_no"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.sts_no}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CTextField
                          error={Boolean(touched.cust_po && errors.cust_po)}
                          helperText={touched.cust_po && errors.cust_po}
                          label="Cust PO"
                          name="cust_po"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.cust_po}
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
                      <Grid item xs={2}>
                        <FormControlLabel
                          control={
                            <Switch onChange={handleSwitch} name="checkedA" />
                          }
                          label="Remove Duplicate"
                        />
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
                    title: 'do_num',
                    field: 'do_num',
                    type: 'string',
                    editable: 'never',
                  },
                  {
                    title: 'co_num',
                    field: 'co_num',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'co_line',
                    field: 'co_line',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'cust_po',
                    field: 'cust_po',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'STS_PO',
                    field: 'STS_PO',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'item',
                    field: 'item',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Type/End',
                    field: 'Uf_typeEnd',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'NPS',
                    field: 'Uf_NPS',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Grade',
                    field: 'Uf_Grade',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Schedule',
                    field: 'Uf_Schedule',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Length',
                    field: 'Uf_length',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Uf_spec',
                    field: 'Uf_spec',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'qty_shipped',
                    field: 'qty_shipped',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'lot',
                    field: 'lot',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Location',
                    field: 'loc',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'sts no',
                    field: 'sts_no',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'qty_sts_no',
                    field: 'qty_sts_no',
                    type: 'string',
                    editable: 'never'
                  },
                  { title: 'sts no 2', field: 'sts_no2', type: 'string' },
                  {
                    title: 'qty_sts_no 2',
                    field: 'qty_sts_no2',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'sts no 3',
                    field: 'sts_no3',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'qty_sts_no 3',
                    field: 'qty_sts_no2',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'remark',
                    field: 'remark',
                    type: 'string',
                    editable: 'always',
                    render: (rowData) => (
                      <div>
                        <TextField />
                      </div>
                    )
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
                      if (columnDef.field === 'tag_status') {
                        API.get(
                          'REPORT_TagStatus/data.php',
                          {
                            params: {
                              load: 'update_status',
                              id: rowData.id,
                              status_value: newValue
                            }
                          }
                        );
                        const newData = [...data];
                        const index = data.indexOf(rowData);
                        newData[index].tag_status = newValue;
                        setData(newData);
                      }
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

export default DoInventory;
