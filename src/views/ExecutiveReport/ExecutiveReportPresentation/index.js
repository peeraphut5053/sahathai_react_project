import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Card, CardActions, CardContent, Grid, ListItem, ListItemText } from '@material-ui/core';

import PieChartExecutiveSummary from '../PieChartExecutiveSummaryPresentation';
import PieChartExecutiveSummary2 from '../PieChartExecutiveSummary2Presentation';
import PresentationPageOne from '../PresentationPageOne';
import TableExecutiveSummary from '../TableExecutiveSummary';
import ChartExecutiveSummary from '../ChartExecutiveSummary';
import OutStanddingPresentation from '../OutStanddingPresentation';
import QualityManagementPresentation from '../QualityManagementPresentation';
import QualityManagementPresentation0 from '../QualityManagementPresentation0';

import CalendarActivitiesPresentation from '../CalendarActivitiesPresentation';
import CalendarActivitiesPresentation2 from '../CalendarActivitiesPresentation2';
import CalendarActivitiesPresentation3 from '../CalendarActivitiesPresentation3';
import EventsActivity from '../CalendarActivitiesPresentationData'
import ExecutiveSummaryQualityManagementChart from '../ExecutiveSummaryQualityManagementChart'

import moment from "moment";
import CertificationPresentation from '../CertificationPresentation';
import PresentationPageEnd from '../PresentationPageEnd';
import TableExecutiveSummaryPresentation from '../TableExecutiveSummaryPresentation';

moment.locale("th");



const useStyles = makeStyles((theme) => ({
    listItemText: {
        fontSize: '3vh',//Insert your required size
    },
    root: {
        marginTop: '-2.5%',
        maxWidth: '100vw',
        flexGrow: 1,
        // height: '95vh'
    },
    rootCards: {
        maxWidth: '100vw',
        flexGrow: 1,
        height: '89vh',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 30,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 230,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
}));

export default function ExecutiveReportPresentation() {


    const PresentationSteps = [
        {
            label: '',
            page: <Grid style={{ textAlign: 'center', marginTop: '10vh' }}>
                <PresentationPageOne />
                <Button style={{ marginTop: 20 }} variant="contained" color="secondary" onClick={toggleFullScreen} > Let's Start Your Presentation !!  </Button>
            </Grid>
        },
        {
            label: 'EXECUTIVE SUMMARY',
            page: <Grid style={{ paddingTop: '10vh' }}>
                <TableExecutiveSummaryPresentation />
            </Grid>

        },
        {
            label: 'SUMMARY BY CHART',
            page: <Grid style={{ paddingTop: '10vh' }}>
                <ChartExecutiveSummary
                    Item_Group="all"
                /></Grid>
        },
        {
            label: 'COIL RECEIVED(MT) & STEEL PIPE DELIVERY(MT)',
            page: <Grid style={{ paddingTop: '10vh' }}>
                <Grid container spacing={1} >
                    <Grid item sm={12} xl={12} xs={12} lg={12} >
                        <PieChartExecutiveSummary />
                    </Grid>
                    <Grid item sm={12} xl={12} xs={12} lg={12} >
                        <PieChartExecutiveSummary2 />
                    </Grid>
                </Grid>
            </Grid>
        },
        {
            label: 'OUTSTANDING',
            page: <Grid style={{ paddingTop: '10vh' }}>
                <OutStanddingPresentation />
            </Grid>
        },

        // {
        //     label: 'SIGNIFICANT ACTVITIES',
        //     page: <Grid style={{ paddingTop: '7.5vh' }}>
        //         <CalendarActivitiesPresentation
        //             EventsActivity={EventsActivity}
        //         />
        //     </Grid>
        // },
        // {
        //     label: 'EXECUTIVE SUMMARY FOR QUALITY MANAGEMENT',
        //     page: <Grid style={{ paddingTop: '10vh' }}>
        //         <QualityManagementPresentation0 />
        //     </Grid>
        // },
        // {
        //     label: 'EXECUTIVE SUMMARY FOR QUALITY MANAGEMENT',
        //     page: <Grid style={{ paddingTop: '10vh' }}>
        //         <QualityManagementPresentation />
        //     </Grid>
        // },
        // {
        //     label: 'Executive summary for quality management',
        //     page: <Grid style={{ paddingTop: '10vh' }}>
        //         <ExecutiveSummaryQualityManagementChart />
        //     </Grid>
        // },
        // {
        //     label: 'CERTIFICATION',
        //     page: <Grid style={{ paddingTop: '10vh' }}>
        //         <CertificationPresentation />
        //     </Grid>
        // },
        {
            label: '',
            page: <Grid style={{ paddingTop: '10vh' }}>
                <PresentationPageEnd />
            </Grid>
        },
    ];

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0); //////////////////////////////
    const maxSteps = PresentationSteps.length;



    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    function toggleFullScreen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
        setActiveStep(1)

    }





    return (
        <div className={classes.root}>
            {/* <div style={{position:'absolute',textAlign:'right'}} >
            <Button variant="contained" style={{position:'absolute',textAlign:'right'}} color="secondary" onClick={toggleFullScreen} > Full  </Button>

            </div> */}

            {/* <Paper square elevation={0} className={classes.header}>
                <Typography>{PresentationSteps[activeStep].label}</Typography>
            </Paper> */}

            <ListItem dense style={{ position: 'absolute', marginTop: '0.1%' }}  >
                <ListItemText classes={{ primary: classes.listItemText }} primary={PresentationSteps[activeStep].label} />
                <img alt="Product" style={{ height: '5vh', marginRight: '1.3vw', marginTop: '0.4%' }} src={'/static/images/products/STS_logo.jpg'} />
            </ListItem >

            <Card className={classes.rootCards} variant="outlined">
                {PresentationSteps[activeStep].page}
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>

            {/* <img
            {PresentationSteps[activeStep].page}
        className={classes.img}
        src={PresentationSteps[activeStep].imgPath}
        alt={PresentationSteps[activeStep].label}
      /> */}

            <MobileStepper
                style={{ marginTop: '0.5%' }}
                variant="progress"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
            <ListItem dense style={{ position: 'fixed', marginTop: '0%', fontSize: '1.6vh', fontFamily: 'Roboto' }}  >
                <ListItemText primary={''} />
                <ListItemText primary={``} />
                Last update : {moment().format("YYYY/MM/D HH:mm:ss ")}
            </ListItem >
        </div>
    );
}
