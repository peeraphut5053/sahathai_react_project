import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import CardReportProductFinish from './CardReportProductFinish';
import LatestProducts from './LatestProducts';
import ChartExecutiveSummary from './ChartExecutiveSummary';
import CardReportProductionDaily from './CardReportProductionDaily';
import TableExecutiveSummary from './TableExecutiveSummary';
import CardReportProductFromming from './CardReportProductFromming';
import CardAppProductionOvertime from './CardAppProductionOvertime';
import CardReportProductProductionIndex from './CardReportProductProductionIndex';
import PieChartExecutiveSummary from './PieChartExecutiveSummary';
import PieChartExecutiveSummary2 from './PieChartExecutiveSummary2';
import { isMobile } from "react-device-detect";


const RootPage = styled(Page)(({ theme }) => ({
  background:
    `linear-gradient(180deg, ${theme.palette.background.dark} 0%, ${theme.palette.background.default} 48%, #ffffff 100%)`,
  minHeight: '100%',
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(2.5)
}));

const HeaderPanel = styled(Box)(({ theme }) => ({
  background:
    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, #ffffff 52%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`,
  border: `1px solid ${alpha(theme.palette.info.main, 0.12)}`,
  borderRadius: 8,
  boxShadow: `0 18px 40px ${alpha(theme.palette.info.main, 0.10)}`,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2.25, 2.5),
}));

const ReportCardShell = styled(Box)(({ theme }) => ({
  height: '100%',
  '& > *': {
    border: `1px solid ${alpha(theme.palette.info.main, 0.12)}`,
    borderRadius: '8px !important',
    boxShadow: `0 14px 32px ${alpha(theme.palette.info.main, 0.10)}`,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    transition: theme.transitions.create(['box-shadow', 'transform', 'border-color']),
  },
  '& > *::before': {
    background:
      `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    content: '""',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: 4,
  },
  '& > *:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.28),
    boxShadow: `0 20px 44px ${alpha(theme.palette.primary.dark, 0.14)}`,
    transform: 'translateY(-2px)',
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(2.25, 2.5),
  },
  '& .MuiAvatar-root': {
    background:
      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) !important`,
    boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.24)}`,
  },
  '& .MuiTypography-h6:last-of-type': {
    color: theme.palette.info.main,
    fontSize: '1rem',
    fontWeight: 800,
    lineHeight: 1.35,
  },
}));

const PanelCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.info.main, 0.12)}`,
  borderRadius: 8,
  boxShadow: `0 14px 32px ${alpha(theme.palette.info.main, 0.09)}`,
  height: '100%',
  overflow: 'hidden',
}));

const PanelHeader = styled(CardHeader)(({ theme }) => ({
  background:
    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.10)} 0%, rgba(255,255,255,0.98) 100%)`,
  borderBottom: `1px solid ${alpha(theme.palette.info.main, 0.10)}`,
  padding: theme.spacing(1.75, 2),
  '& .MuiCardHeader-title': {
    color: theme.palette.info.main,
    fontSize: '1rem',
    fontWeight: 800,
  },
}));

const ExecutiveReport = () => {
  useEffect(() => {


    if (isMobile == true) {

      setTimeout(() => {
        document.documentElement.webkitRequestFullScreen();
      }, 5000);
    }
  }, [])




  return (
    <RootPage
      title="Dashboard"
    >
      {/* {isMobile ? <h2>Mobile</h2> : <h2>Desktop</h2>} */}

      <Container maxWidth={false}>
        <HeaderPanel>
          <Typography sx={{ color: '#102f43', fontSize: 26, fontWeight: 900, lineHeight: 1.1 }}>
            Executive Report
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 0.75 }} variant="body2">
            Summary cards and operational report shortcuts for management review.
          </Typography>
        </HeaderPanel>
        <Grid item lg={12}>
          <Grid container spacing={2}>
            <Grid item sm={6} xl={3} xs={12} lg={3} >
              <ReportCardShell><CardReportProductFromming /></ReportCardShell>
            </Grid>
            <Grid item sm={6} xl={3} xs={12} lg={3}>
              <ReportCardShell><CardReportProductFinish /></ReportCardShell>
            </Grid>
            <Grid item sm={6} xl={3} xs={12} lg={3}>
              <ReportCardShell><CardReportProductionDaily /></ReportCardShell>
            </Grid>
            <Grid item sm={6} xl={3} xs={12} lg={3}>
              <ReportCardShell><CardAppProductionOvertime /></ReportCardShell>
            </Grid>
            <Grid item sm={6} xl={3} xs={12} lg={3} >
              <ReportCardShell><CardReportProductProductionIndex /></ReportCardShell>
            </Grid>
            {/* <Grid item xs={12}>
                <CardNext />
              </Grid> */}
          </Grid>
        </Grid>
        <Grid container spacing={2} >
          <Grid item sm={6} xl={6} xs={12} lg={6} >
            <TableExecutiveSummary />
          </Grid>
          <Grid item sm={6} xl={6} xs={12} lg={6} >
            <ChartExecutiveSummary />
          </Grid>
          <Grid item sm={6} xl={6} xs={12} lg={6} >
            <PanelCard>
              <CardContent>
                <PanelHeader title="Coil Received (MT) & Steel Pipe Delivery (MT)" />
                <Divider />
                <Grid container spacing={2} >
                  <Grid item sm={6} xl={6} xs={6} lg={6} >
                    <PieChartExecutiveSummary />
                  </Grid>
                  <Grid item sm={6} xl={6} xs={6} lg={6} >
                    <PieChartExecutiveSummary2 />
                  </Grid>
                </Grid>
              </CardContent>
            </PanelCard>


          </Grid>
          {/* <Grid item lg={4} md={6} xl={3} xs={12} >
            <LatestProducts />
          </Grid> */}
          <Grid item sm={6} xl={6} xs={12} lg={6}  >
            <LatestProducts />
          </Grid>




        </Grid>
      </Container>
    </RootPage>
  );
};

export default ExecutiveReport;
