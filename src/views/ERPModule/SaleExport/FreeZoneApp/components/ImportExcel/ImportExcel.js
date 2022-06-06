import React, {  useState } from 'react';
import './App.css';
import {  ExcelRenderer } from 'react-excel-renderer';
// import { Jumbotron, Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Button, Fade, FormFeedback, Container, Card } from 'reactstrap';
import MaterialTable, { MTableToolbar } from 'material-table'
import tableIcons from './../tableIcons'
import {  Input, Grid } from '@material-ui/core';


export default function ImportExcel(props) {

  // const [isOpen, setisOpen] = useState(false)
  const [ setdataLoaded] = useState(false)
  const [ setisFormInvalid] = useState(false)
  const [ setuploadedFileName] = useState("")
  const [ setrows] = useState([])
  const [ setcols] = useState([])
  const [ExcelData, setExcelData] = useState([])

  const renderFile = (fileObj) => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      console.log(resp)
      if (err) {
        console.log(err);
      }
      else {
        setdataLoaded(true)
        setcols(resp.cols)
        setrows(resp.rows)

        const data = resp.rows.map((item) => {
          return {
            "doc_date": item[0],
            "item": item[1],
            "item_description": item[2],            
            "po_num": item[2].split("PO")[1],
            "item_qty": item[3],
            "item_unit": item[4],
            "item_weight": item[5],
            "item_price": item[6],
            "doc_ref":item[7]
          }
        })
        setExcelData(data)
        props.setDocLine(data)
      }
    });
  }

  const fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
        setuploadedFileName(fileName)
        setisFormInvalid(false)
        renderFile(fileObj)
      }
      else {
        setisFormInvalid(true)
        setuploadedFileName(fileName)
      }
    }
  }


  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={()=>{console.log(ExcelData)}}> Save</Button> */}
      <MaterialTable
        style={{ width: '100%', margin: 5, overflowX: "scroll" }}
        icons={tableIcons}
        title={""}
        columns={props.columns}
        onRowClick={(event, rowData) => {
          console.log(event)
        }}
        data={props.data}
        options={{
          search: false,
          paging: false,
          maxBodyHeight: '60vh',
          minBodyHeight: '60vh',
          toolbar: true,
        }}

        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setExcelData([...ExcelData, newData]);
                props.setDocLine([...ExcelData, newData])
                console.log(newData)
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...ExcelData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setExcelData([...dataUpdate]);
                props.setDocLine([...dataUpdate])
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...ExcelData];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setExcelData([...dataDelete]);
                props.setDocLine([...dataDelete])
                resolve()
              }, 1000)
            }),
        }}

        components={{
          Toolbar: props => (
            <div style={{ backgroundColor: '#FFF' }}>
              <MTableToolbar {...props} classes={{ root: "my-temp-class" }} />
              <Grid container spacing={2}  >
                <Grid item xs={10}>
                  <Input type="file" color="primary" variant="contained" onChange={fileHandler.bind(this)} style={{ "padding": "10px" }} />จำนวน {ExcelData.length} รายการ
                  </Grid>
              </Grid>
            </div>
          ),
        }}
      />
    </div>
  )
}

/*
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.fileInput = React.createRef();
  }

  renderFile = (fileObj) => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      console.log(resp)

      if (err) {
        console.log(err);
      }
      else {
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  }

  fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
      }
      else {
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }
  }


  openFileBrowser = () => {
    this.fileInput.current.click();
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} />
        <Container>
          {this.state.dataLoaded &&
            <div>
              <Card body outline color="secondary" className="restrict-card">
                <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
              </Card>
            </div>}
        </Container>
      </div>
    );
  }
}

export default ImportExcel;

*/
