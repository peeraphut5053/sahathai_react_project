import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { colors, Grid } from '@material-ui/core';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'MONTHLY OPERATION REPORT',
        imgPath: '/static/images/products/Picture1.jpg',
    },
    {
        label: 'MONTHLY OPERATION REPORT',
        imgPath: '/static/images/products/coil.jpg',
    },
    {
        label: 'MONTHLY OPERATION REPORT',
        imgPath: '/static/images/products/packing.jpg',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100vw',
        flexGrow: 1,
        textAlign:'center',
        minHeight:'80vh'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: '70vh',
        display: 'block',
        maxWidth: '85vw',
        overflow: 'hidden',
        width: '100%',

    },
}));

function ExecutiveSummaryQualityManagementChart() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
            <Typography variant="h1" component="h2"></Typography>
            </Paper>
            
            <Grid style={{alignSelf:'center',textAlign:'center'}}>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    // onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {tutorialSteps.map((step, index) => (
                        <div key={step.label} style={{textAlign: '-webkit-center'}}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <img className={classes.img} src={step.imgPath} alt={step.label} />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
            </Grid>
        </div>
    );
}

export default ExecutiveSummaryQualityManagementChart;
