import React, { useState, useEffect, useRef } from 'react';
import MaterialTable from 'material-table'
import tableIcons from '../tableIcons'
import { Grid, Paper, Button, Container,  } from '@material-ui/core';
import api from '../api'
import { useReactToPrint } from 'react-to-print';



const DocumentModule = props => {
    const [DocumentHeader, setDocumentHeader] = useState([])
    const [DocumentLine, setDocumentLine] = useState([])
    const [headerValues, setheaderValues] = useState({})

    useEffect(() => {
        api.get(`data.php?load=DocumentHeader`)
            .then(response => {
                setDocumentHeader(response.data)
            })
    }, [])

    const getDocumentLine = (rowData) => {
        setheaderValues(rowData)
        console.log(rowData)
        api.get(`data.php?load=DocumentLine&doc_hdr=${rowData.doc_hdr}`)
            .then(response => {
                setDocumentLine(response.data)
            })
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Grid container spacing={2}  >
            <Grid item xs={3}>
                <MaterialTable
                    style={{ width: '100%', margin: 5, overflowX: "scroll" }}
                    icons={tableIcons}
                    title="เอกสาร"
                    columns={[
                        { title: 'Doc Num', field: 'doc_hdr' },
                        { title: 'วันที่', field: 'create_date' },
                    ]}
                    data={DocumentHeader}
                    options={{
                        search: false,
                        paging: false,
                        maxBodyHeight: '55vh',
                        minBodyHeight: '55vh',
                        filtering: false,
                    }}
                    onRowClick={(event, rowData) => {
                        getDocumentLine(rowData)
                    }}
                />
            </Grid>
            <Grid item xs={9}>
                <Grid container spacing={2}  >
                    <Grid item xs={12}>
                        <Paper>
                            <Grid container spacing={2} >
                                <Grid item xs={1}>
                                    เลขเอกสาร
                                </Grid>
                                <Grid item xs={2}>
                                    {headerValues.doc_hdr}
                                </Grid>
                                <Grid item xs={2}>
                                    ชื่อผู้ส่งออก
                                </Grid>
                                <Grid item xs={3}>
                                    {headerValues.name}
                                </Grid>
                                <Grid item xs={2}>
                                    ประเภทใบขน
                                </Grid>
                                <Grid item xs={2}>
                                    {headerValues.doc_hdr}
                                </Grid>
                                <Grid item xs={1}>เลขอ้างอิง</Grid>
                                <Grid item xs={2}>{headerValues.doc_hdr}</Grid>
                                <Grid item xs={2}>
                                    ที่อยู่
                                </Grid>
                                <Grid item xs={3}>
                                    {headerValues.address}
                                </Grid>

                                <Grid item xs={2}>วันที่</Grid>
                                <Grid item xs={1}>{headerValues.create_date}</Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable
                            style={{ width: '100%', margin: 5, overflowX: "scroll" }}
                            icons={tableIcons}
                            title={""}
                            columns={[
                                { title: 'item', field: 'item' },
                                { title: 'เลข PO', field: 'po_num' },
                                { title: 'จำนวนรวม', field: 'item_qty', type: 'numeric' },
                            ]}
                            data={DocumentLine}
                            options={{
                                search: false,
                                paging: false,
                                maxBodyHeight: '55vh',
                                minBodyHeight: '55vh',
                                filtering: false,
                                headerStyle: { backgroundColor: 'transparent' }
                            }}
                        />
                    </Grid>
                </Grid>




            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={9} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="secondary" style={{ margin: 10 }} onClick={handlePrint} >Print  </Button>


            </Grid>

            <Grid item xs={12}>
                <div style={{ textAlign: "center", height: 1000, overflowY: "scroll", }}>
                    <ComponentToPrint
                        ref={componentRef}
                        DocumentLine={DocumentLine}
                        headerValues={headerValues}
                    />
                </div>
            </Grid>
        </Grid>
    );
};


class ComponentToPrint extends React.Component {


    render() {
        //const sumTotal = this.props.qtyMoveList.reduce((sum, number) => { return sum + number.qty1 }, 0)


        // const useStyles = makeStyles((theme) => ({
        //     textHeader: {
        //         position: 'absolute',
        //         width: '98%',
        //         height: '85vh',
        //         backgroundColor: theme.palette.background.paper,
        //         border: '0px solid #000',
        //         boxShadow: theme.shadows[5],
        //         padding: theme.spacing(2, 4, 3),
        //     },
        // }));
        // const classes = useStyles();

        const tableStyle = {
            padding: "10px",
            fontFamily: "auto",
            borderCollapse: "collapse",
            fontSize: "14px"
        };
        const textHeaderStyle = {
            fontSize: "12px"
        }
        const textDetailStyle = {
            fontSize: "12px",
            textAlign: "center"
        }
        return (
            <Container >

                <Container maxWidth="lg" style={{ paddingTop: 50, width: "99%" }}  >
                    <Grid container >
                        <Grid item xs={12} style={{ textAlign: "left" }}>
                            <div style={{ fontSize: "30px", textAlign: "center" }}>
                                {(this.props.headerValues.doc_type === "import") ? "ใบขนสินค้าเข้าเขต FREEZONE" : "ใบขนสินค้าออกเขต FREEZONE"}
                            </div>

                            <table border="1px" width={"100%"} style={tableStyle}>
                                <tbody>
                                    <tr>
                                        <td colspan="3" width={"50%"} ><p>เลขเอกสาร</p> {this.props.headerValues.doc_hdr}</td>
                                        <td colspan="3" width={"50%"}><p>เลขเอกสารอ้างอิง</p></td>
                                    </tr>
                                    <tr>
                                        <td colspan="3"><p>ชื่อผู้ส่งออก</p> {this.props.headerValues.name}</td>
                                        <td colspan="3"><p>ประเภทใบขน</p> {this.props.headerValues.doc_type}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3"><p>ที่อยู่</p>	{this.props.headerValues.address}</td>
                                        <td colspan="3"><p>วันที่</p> {this.props.headerValues.create_date}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="1px" width={"100%"} style={tableStyle}>
                                <tbody>
                                    {this.props.DocumentLine.map((items) =>
                                        <tr>
                                            <td width={"20px"}><div style={textHeaderStyle} >
                                                <p>{items.MyIndex}</p>
                                            </div>
                                            </td>

                                            <td>
                                                <p style={textHeaderStyle} >Item Code: {items.item}</p>
                                                <p style={textHeaderStyle} >Item Description: {items.item_description}</p>
                                                <p style={textHeaderStyle}>PO: {items.po_num}</p>
                                            </td>
                                            <td style={textHeaderStyle} >
                                                ปริมาณ
                                                <p style={textDetailStyle}>{items.item_qty}</p>
                                            </td>
                                            <td style={textHeaderStyle} >
                                                น้ำหนักสุทธิ
                                                <p style={textDetailStyle}>{items.item_weight}</p>
                                            </td>
                                            <td style={textHeaderStyle} >ราคา
                                                <p style={textDetailStyle}>{items.item_price}</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Grid>



                    </Grid>
                </Container >

            </Container >

        );
    }
}
export default DocumentModule;