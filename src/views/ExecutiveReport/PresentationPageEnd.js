import React from 'react';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Grid } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'MONTHLY OPERATION REPORT',
        imgPath: '/static/images/products/processingPipe.jpg',
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

const Root = styled('div')({
    maxWidth: '100vw',
    flexGrow: 1,
    textAlign:'center',
    minHeight:'80vh'
});

const HeaderPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
}));

const Image = styled('img')({
    height: '70vh',
    display: 'block',
    maxWidth: '96vw',
    overflow: 'hidden',
    width: '100%',
});

function PresentationPageEnd() {
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
        <Root>
            <HeaderPaper square elevation={0}>
            <Typography variant="h1" component="h2"></Typography>
            </HeaderPaper>
            
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
                                <Image src={step.imgPath} alt={step.label} />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
            </Grid>
            {/* <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
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
            /> */}
        </Root>
    );
}

export default PresentationPageEnd;
