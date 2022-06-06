import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SubStepList from './SubStepList';
import stepCase from './stepCase'
import CardSubDetail from './CardSubDetail'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '95%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 450,
        widows: 150,
    },
}));





function getStepContent(step, setshowSubDetail, setCaseTitle, setCaseDescription) {
    switch (step) {
        case 0: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 1: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 2: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 3: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 4: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 5: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 6: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 7: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 8: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 9: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 10: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 11: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 12: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 13: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 14: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 15: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 16: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 17: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 18: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 19: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;
        case 20: return <SubStepList stepCase={stepCase[step]} setshowSubDetail={setshowSubDetail} setCaseTitle={setCaseTitle} setCaseDescription={setCaseDescription} />;

        default:
            return 'Unknown step';
    }
}

export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [showSubDetail, setshowSubDetail] = useState([])
    const [CaseTitle, setCaseTitle] = useState(null)
    const [CaseDescription, setCaseDescription] = useState(null)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

 


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper} elevation={3} variant="outlined">
                        <Stepper onCLick={() => console.log('123')} activeStep={activeStep} orientation="vertical">
                            {stepCase.map((label, index) => (
                                <Step key={label.CaseTitle}>
                                    <StepLabel ><Button onClick={() => setActiveStep(index)}>{label.CaseTitle}</Button></StepLabel>
                                    <StepContent>
                                        <Typography>{getStepContent(index, setshowSubDetail, setCaseTitle, setCaseDescription)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >Back</Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === stepCase.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === stepCase.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
          </Button>
                            </Paper>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={9}  >
                    {/* <Paper className={classes.paper} style={{ position: "fixed", height: '90%' }} elevation={3} variant="outlined"> */}
                    <Paper square elevation={3} style={{ height: '90vh', position: "fixed", width: '72vw', overflow: 'auto' }} className={classes.resetContainer}>
                        {/* {JSON.stringify(showSubDetail)} */}


                        <Typography gutterBottom variant="h3">
                            {CaseTitle}
                        </Typography>
                        <Typography gutterBottom variant="h6">
                            {CaseDescription}
                        </Typography>
                        {showSubDetail.map((item) =>
                            <>
                                < CardSubDetail
                                    title={item.title}
                                    description={item.description}
                                    department={item.department}
                                    img={item.img}
                                    link={item.link}
                                />
                            </>
                        )}
                        {/* < CardSubDetail showSubDetail={showSubDetail} /> */}
                    </Paper>
                    {/* </Paper> */}
                </Grid>
            </Grid>


        </div>

    );
}
