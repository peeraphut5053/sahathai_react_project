import React, { useEffect, useState } from 'react';
import {
  Chip,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from 'src/views/components/table/tableIcons';
import API from 'src/views/components/API';
import ModalNopaperSmall from '../../../components/ModalNopaperSmall';
import STS_execRpt_W_bySize_Live_Detail from './STS_execRpt_W_bySize_Live_Detail';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const STS_execRpt_W_bySize_Live = (props) => {
  const classes = useStyles();
  const [DataSTS_execRpt_W_bySize_Live, setDataSTS_execRpt_W_bySize_Live] = useState([])
  const [IsLoadingState, setIsLoadingState] = useState(true)

  const [openModalDetailUSA, setOpenModalDetailUSA] = React.useState(false);
  const [openModalDetailAUS, setOpenModalDetailAUS] = React.useState(false);
  const [openModalDetailIN, setOpenModalDetailIN] = React.useState(false);

  const searchSTS_execRpt_W_bySize_Live = (daystart, dayend) => {

    API.get(`API_ExecutiveReport/data.php?load=STS_execRpt_W_bySize_Live&daystart=${daystart}&dayend=${dayend}`)
      .then(res => {
        setDataSTS_execRpt_W_bySize_Live(addTotal(res.data))
        setIsLoadingState(false)

      })
  }

  useEffect(() => {

    searchSTS_execRpt_W_bySize_Live(props.daystart, props.dayend)
  }, [])

  const addTotal = (data) => {
    let keys = Object.keys(data[0]);
    let totalRow = {};
    let emptyRow = {};
    for (let key of keys) {
      if (key === keys[0]) { totalRow[key] = 'Total'; }
      if (key === keys[1]) { totalRow[key] = ''; }
      else if (key === keys[2]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[2]]); }, 0);; }
      else if (key === keys[3]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[3]]); }, 0);; }
      else if (key === keys[4]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[4]]); }, 0);; }
      else if (key === keys[5]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[5]]); }, 0);; }
      else if (key === keys[6]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[6]]); }, 0);; }
      else if (key === keys[7]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[7]]); }, 0);; }
      else if (key === keys[8]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[8]]); }, 0);; }
      else if (key === keys[9]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[9]]); }, 0);; }
      else if (key === keys[10]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[10]]); }, 0);; }
      else if (key === keys[11]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[11]]); }, 0);; }
      else if (key === keys[12]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[12]]); }, 0);; }
      else if (key === keys[13]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[13]]); }, 0);; }
      else if (key === keys[14]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[14]]); }, 0);; }
      else if (key === keys[15]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[15]]); }, 0);; }
      else if (key === keys[16]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[16]]); }, 0);; }
      else if (key === keys[17]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[17]]); }, 0);; }
      else if (key === keys[18]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[18]]); }, 0);; }
      else if (key === keys[19]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[19]]); }, 0);; }
      else if (key === keys[20]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[20]]); }, 0);; }
      else {
        totalRow[key] = '';
      }
      emptyRow[key] = '';
    }
    return [...data, emptyRow, totalRow];
  }

  const handleCloseModalItem = async () => {
    setOpenModalDetailUSA(false);
    setOpenModalDetailAUS(false);
    setOpenModalDetailIN(false);
  };

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <ModalNopaperSmall
         style={{  width: 500 }} 
        modalHeader={
          <>รายงาน {`Detail USA`}</>
        }
        modalDetail={
          <STS_execRpt_W_bySize_Live_Detail
            title={`Detail USA ${props.title}`}
            daystart={props.daystart}
            dayend={props.dayend}
            country={"USA"}
          />
        }
        open={openModalDetailUSA}
        onClose={handleCloseModalItem}
      />
      <ModalNopaperSmall
        modalHeader={
          <>รายงาน {`Detail AUS`}</>
        }
        modalDetail={
          <STS_execRpt_W_bySize_Live_Detail
            title={`Detail AUS ${props.title}`}
            label={props.label}
            daystart={props.daystart}
            dayend={props.dayend}
            country={"AUS"}
          />
        }
        open={openModalDetailAUS}
        onClose={handleCloseModalItem}
      />
      <ModalNopaperSmall 
        modalHeader={
          <>รายงาน {`Detail ขายใน`}</>
        }
        modalDetail={
          <STS_execRpt_W_bySize_Live_Detail
            title={`Detail ขายใน ${props.title}`}
            daystart={props.daystart}
            dayend={props.dayend}
            country={"IN"}
          />
        }
        open={openModalDetailIN}
        onClose={handleCloseModalItem}
      />


      <Container maxWidth={false}>

        <Grid container spacing={0} >
          {/* {JSON.stringify(DataSTS_execRpt_W_bySize_Live)} */}
          {/* <Grid item xs={12}>
            <Button onClick={searchSTS_execRpt_W_bySize_Live}>Search</Button>

          </Grid> */}
          <Grid item xs={12}>
            <MaterialTable
              title={`รายงาน ${props.title}`}
              icons={tableIcons}
              isLoading={IsLoadingState}

              columns={[

                // { title: 'no.', field: 'no.' },
                { title: 'SIZE', field: 'SIZE' },
                { title: 'USA จำนวนเส้น', field: 'USA จำนวนเส้น', type: 'numeric' },
                { title: 'USA นน.ตัน', field: 'USA นน.ตัน', type: 'numeric' },
                { title: 'AUS จำนวนเส้น', field: 'AUS จำนวนเส้น', type: 'numeric' },
                { title: 'AUS นน.ตัน', field: 'AUS นน.ตัน', type: 'numeric' },
                { title: 'ขายใน จำนวนเส้น', field: 'ขายใน จำนวนเส้น', type: 'numeric' },
                { title: 'ขายใน นน.ตัน', field: 'ขายใน นน.ตัน', type: 'numeric' },
                { title: 'รวม จำนวนเส้น', field: 'รวม จำนวนเส้น', type: 'numeric' },
                { title: 'รวม นน.ตัน', field: 'รวม นน.ตัน', type: 'numeric' },


              ]}
              data={DataSTS_execRpt_W_bySize_Live}

              components={{
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <div style={{ padding: '0px 20px 0.1px'}}>
                      <Chip
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={setOpenModalDetailUSA}
                        label={"Detail USA"}
                      >
                      </Chip>
                   <span style={{ padding: '0px 5px' }}> </span>
                      <Chip
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={setOpenModalDetailAUS}
                        label={"Detail AUS"}
                      >
                      </Chip>
                    <span style={{ padding: '0px 5px' }}> </span>
                      <Chip
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={setOpenModalDetailIN}
                        label={"Detail ขายใน"}
                      >
                      </Chip>
                        </div>
                    </div>
                  ),
                }}

              options={{

                cellStyle: { padding: '0.1' },
                headerStyle: { padding: '0.1' },
                search: false,
                paging: false,
                maxBodyHeight: '65vh',
                minBodyHeight: '65vh',
                sorting: false,
                filtering: false,
                // width: '100vw',
                exportButton: true,
                rowStyle: rowData => ({
                  // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                  fontSize: 14,
                  padding: 0,
                  width: 500,
                  fontFamily: 'sans-serif'
                }
                ),
              }}
            />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
};

export default STS_execRpt_W_bySize_Live;
