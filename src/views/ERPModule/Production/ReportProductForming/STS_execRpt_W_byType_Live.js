import React, { useEffect, useState } from 'react';
import { Chip, Container, Grid } from '@mui/material';
import Page from 'src/components/Page';
import DataTable from 'src/components/DataTable';
import API from 'src/views/components/API';
import ModalNopaperSmall from '../../../components/ModalNopaperSmall';
import STS_execRpt_W_byType_Live_Detail from './STS_execRpt_W_byType_Live_Detail';
import styles from './ReportProductForming.module.css';



const STS_execRpt_W_byType_Live = (props) => {
  const [DataSTS_execRpt_W_byType_Live, setDataSTS_execRpt_W_byType_Live] = useState([])
  const [IsLoadingState, setIsLoadingState] = useState(true)

  const [openModalDetailUSA, setOpenModalDetailUSA] = React.useState(false);
  const [openModalDetailAUS, setOpenModalDetailAUS] = React.useState(false);
  const [openModalDetailIN, setOpenModalDetailIN] = React.useState(false);

  const searchSTS_execRpt_W_byType_Live = (daystart, dayend) => {

    API.get(`API_ExecutiveReport/data.php?load=STS_execRpt_W_byType_Live&daystart=${daystart}&dayend=${dayend}`)
      .then(res => {
        setDataSTS_execRpt_W_byType_Live(addTotal(res.data))
        setIsLoadingState(false)

      })
  }

  useEffect(() => {

    searchSTS_execRpt_W_byType_Live(props.daystart, props.dayend)
  }, [])


  const addTotal = (data) => {
    let keys = Object.keys(data[0]);
    let totalRow = {};
    let emptyRow = {};
    for (let key of keys) {
      if (key === keys[0]) { totalRow[key] = 'Total'; }
      else if (key === keys[1]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[1]]); }, 0);; }
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
      className={styles.root}
      title="Dashboard"
    >
      <ModalNopaperSmall
         style={{  width: 500 }} 
        modalHeader={
          <>รายงาน {`Detail USA`}</>
        }
        modalDetail={
          <STS_execRpt_W_byType_Live_Detail
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
          <STS_execRpt_W_byType_Live_Detail
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
          <STS_execRpt_W_byType_Live_Detail
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
          {/* {JSON.stringify(DataSTS_execRpt_W_byType_Live)} */}
          {/* <Grid item xs={12}>
            <Button onClick={searchSTS_execRpt_W_byType_Live}>Search</Button>

          </Grid> */}
          <Grid item xs={12}>
            <DataTable
              title={`รายงาน ${props.title}`}
              isLoading={IsLoadingState}

              columns={[
                { title: 'Type', field: 'Type' },
                { title: 'USA จำนวนเส้น', field: 'USA จำนวนเส้น', type: 'numeric' },
                { title: 'USA นน.ตัน', field: 'USA นน.ตัน', type: 'numeric' },
                { title: 'AUS จำนวนเส้น', field: 'AUS จำนวนเส้น', type: 'numeric' },
                { title: 'AUS นน.ตัน', field: 'AUS นน.ตัน', type: 'numeric' },
                { title: 'ขายใน จำนวนเส้น', field: 'ขายใน จำนวนเส้น', type: 'numeric' },
                { title: 'ขายใน นน.ตัน', field: 'ขายใน นน.ตัน', type: 'numeric' },
                { title: 'รวม จำนวนเส้น', field: 'รวม จำนวนเส้น', type: 'numeric' },
                { title: 'รวม นน.ตัน', field: 'รวม นน.ตัน', type: 'numeric' },


              ]}
              data={DataSTS_execRpt_W_byType_Live}

              toolbar={
              (
                <div className={styles.menuToolbar}>
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
              )} 
              search={false}
              sorting={false}
              exportButton
              maxBodyHeight="65vh"
              minBodyHeight="65vh"
              cellStyle={{ padding: '10px' }}
              headerStyle={{ padding: '10px' }}
              rowStyle={{
                fontSize: 14,
                padding: 0,
                width: 500,
                fontFamily: 'sans-serif'
              }}
            />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
};

export default STS_execRpt_W_byType_Live;
