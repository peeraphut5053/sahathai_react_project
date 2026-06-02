import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react'
import { Pie } from 'react-chartjs-2';

const supportBlue = '#00a4d8';
const accentRed = '#ef3124';

const MachineCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.045)} 0%, #ffffff 46%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.13)}`,
  borderRadius: 8,
  boxShadow: `0 12px 26px ${alpha('#253746', 0.08)}`,
  height: '100%',
  overflow: 'hidden'
}));

const CardTop = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.10)}`,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1.25, 1.5)
}));

const MachineIcon = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${supportBlue} 100%)`,
  borderRadius: 8,
  color: '#ffffff',
  display: 'flex',
  height: 32,
  justifyContent: 'center',
  width: 32
}));

const ChartFrame = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  height: 178,
  justifyContent: 'center',
  padding: theme.spacing(1.25, 1.5, 0.5)
}));

const MetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.75),
  gridTemplateColumns: '1fr',
  padding: theme.spacing(0.75, 1.25, 1.25)
}));

const MetricTile = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'tileColor'
})(({ theme, tileColor }) => ({
  alignItems: 'center',
  backgroundColor: alpha(tileColor, 0.08),
  border: `1px solid ${alpha(tileColor, 0.18)}`,
  borderRadius: 8,
  display: 'flex',
  gap: theme.spacing(0.75),
  justifyContent: 'space-between',
  minHeight: 42,
  padding: theme.spacing(0.75, 1)
}));

const PieChart = ({ data }) => {
  const { wc, totalTimes, breakTimes, realTime } = data;

  const total = Number(breakTimes) + Number(realTime);
  return (
    <MachineCard>
      <CardTop>
        <Stack alignItems="center" direction="row" spacing={1}>
          <MachineIcon>
            <AccessTimeIcon fontSize="small" />
          </MachineIcon>
          <Box>
            <Typography color="textPrimary" fontWeight={900} variant="subtitle2">
              {wc}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Machine working time
            </Typography>
          </Box>
        </Stack>
        <Typography color="primary" fontWeight={900} variant="caption">
          {total ? `${((Number(realTime) / total) * 100).toFixed(0)}% Run` : '0% Run'}
        </Typography>
      </CardTop>
      <ChartFrame>
        <Pie
          data={{
            labels: ['Downtime', 'Actual Time'],
            datasets: [
              {
                label: 'Machine Time',
                data: [breakTimes, realTime],
                backgroundColor: [
                  alpha(accentRed, 0.22),
                  alpha(supportBlue, 0.24),
                ],
                borderColor: [
                  accentRed,
                  supportBlue,
                ],
                borderWidth: 2,
              },
            ],
          }}
          options={{
            animation: false,
            cutout: '50%',
            layout: { padding: 0 },
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const dataset = context.dataset;
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + Number(currentValue), 0);
                    const currentValue = dataset.data[context.dataIndex];
                    const percentage = total ? ((currentValue / total) * 100).toFixed(2) : '0.00';
                    return `${context.label}: ${currentValue} (${percentage}%)`;
                  }
                }
              },
              datalabels: {
                display: true,
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map(data => {
                      sum += Number(data);
                  });
                  let percentage = (value*100 / sum).toFixed(2)+"%";
                  return percentage;
                },
                color: '#253746',
                font: {
                  weight: 'bold',
                  size: 9
                }
              }
            }
          }}
          plugins={[ChartDataLabels]}
        />
      </ChartFrame>
      <MetricsGrid>
        <MetricTile tileColor="#253746">
          <Stack direction="row" spacing={0.75} alignItems="center">
            <AccessTimeIcon sx={{ color: '#253746', fontSize: 18 }} />
            <Typography color="textSecondary" variant="caption">
              Total Time
            </Typography>
          </Stack>
          <Typography color="textPrimary" fontWeight={900} variant="body2">
            {totalTimes}
          </Typography>
        </MetricTile>
        <MetricTile tileColor={accentRed}>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <WarningAmberIcon sx={{ color: accentRed, fontSize: 18 }} />
            <Typography sx={{ color: accentRed }} variant="caption">
              Downtime
            </Typography>
          </Stack>
          <Typography sx={{ color: accentRed, fontWeight: 900 }} variant="body2">
            {breakTimes}
          </Typography>
        </MetricTile>
        <MetricTile tileColor={supportBlue}>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <PlayCircleFilledWhiteIcon sx={{ color: supportBlue, fontSize: 18 }} />
            <Typography sx={{ color: supportBlue }} variant="caption">
              Actual Time
            </Typography>
          </Stack>
          <Typography sx={{ color: supportBlue, fontWeight: 900 }} variant="body2">
            {realTime}
          </Typography>
        </MetricTile>
      </MetricsGrid>
    </MachineCard>
  )
}

export default PieChart;
