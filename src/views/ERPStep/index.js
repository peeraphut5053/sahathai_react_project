import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SubStepList from './SubStepList';
import stepCase from './stepCase';
import CardSubDetail from './CardSubDetail';
import { Grid } from '@mui/material';


const Root = styled('div')({
    width: '95%',
});

const StepButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
}));

const ActionsContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const ResetPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const StepPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
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
        <Root>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <StepPaper elevation={3} variant="outlined">
                        <Stepper onCLick={() => console.log('123')} activeStep={activeStep} orientation="vertical">
                            {stepCase.map((label, index) => (
                                <Step key={label.CaseTitle}>
                                    <StepLabel ><Button onClick={() => setActiveStep(index)}>{label.CaseTitle}</Button></StepLabel>
                                    <StepContent>
                                        <Typography>{getStepContent(index, setshowSubDetail, setCaseTitle, setCaseDescription)}</Typography>
                                        <ActionsContainer>
                                            <div>
                                                <StepButton
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                >Back</StepButton>
                                                <StepButton
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                >
                                                    {activeStep === stepCase.length - 1 ? 'Finish' : 'Next'}
                                                </StepButton>
                                            </div>
                                        </ActionsContainer>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === stepCase.length && (
                            <ResetPaper square elevation={0}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <StepButton onClick={handleReset}>
                                    Reset
          </StepButton>
                            </ResetPaper>
                        )}
                    </StepPaper>
                </Grid>
                <Grid item xs={9}  >
                    {/* <Paper className={classes.paper} style={{ position: "fixed", height: '90%' }} elevation={3} variant="outlined"> */}
                    <ResetPaper square elevation={3} style={{ height: '90vh', position: "fixed", width: '72vw', overflow: 'auto' }}>
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
                    </ResetPaper>
                    {/* </Paper> */}
                </Grid>
            </Grid>


        </Root>

    );
}
