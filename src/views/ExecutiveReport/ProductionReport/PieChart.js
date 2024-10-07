import { Box, Card, CardHeader, Typography } from '@material-ui/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react'
import { Pie } from 'react-chartjs-2';

const PieChart = ({data }) => {
  const {wc, totalTimes, breakTimes,realTime} = data;
  const total = Number(breakTimes) + Number(realTime);
  Chart.plugins.unregister(ChartDataLabels);
  return (
    <Card>
        <CardHeader title={wc} />
        <Pie
        data={{
          labels: ['Downtime', 'Actual Time'],
          datasets: [
            {
              label: '# of Votes',
              data: [breakTimes, realTime],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
            animation: false,
            cutoutPercentage: 50,
            layout: { padding: 0 },
            legend: {
              display: false
            },
            responsive: true,
            
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  const dataset = data.datasets[tooltipItem.datasetIndex];
                  const total = dataset.data.reduce((previousValue, currentValue) => previousValue + Number(currentValue), 0);
                  const currentValue = dataset.data[tooltipItem.index];
                  const percentage = ((currentValue/total) * 100).toFixed(2); // Keep two decimals
                  return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage}%)`;
                }
              }
            },
            plugins: {
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
                color: 'black',
                font: {
                  weight: 'bold',
                  size: 9
                }
              }
            }
          }}
          plugins={[ChartDataLabels]}
         />
         <Box
              display="flex"
              justifyContent="center"
              mt={2}
            >
                <Box  p={1} textAlign="center" >
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    style={{  color: 'black' }}
                  >
                    Total Time
                  </Typography>
                  <Typography
                    style={{ color: 'black' }}
                    variant="h4"
                  >
                    {totalTimes}
                  </Typography>
                </Box>
                <Box  p={1} textAlign="center" >
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    style={{ color: 'rgba(255, 99, 132, 1)'}}
                  >
                   Downtime
                  </Typography>
                  <Typography
                    style={{ color: 'rgba(255, 99, 132, 1)' }}
                    variant="h4"
                  >
                    {breakTimes}
                  </Typography>
                </Box>
                <Box  p={1} textAlign="center" >
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    style={{ color: 'rgba(54, 162, 235, 1)'}}
                  >
                    Actual Time
                  </Typography>
                  <Typography
                    style={{ color: 'rgba(54, 162, 235, 1)' }}
                    variant="h4"
                  >
                    {realTime}
                  </Typography>
                </Box>
            </Box>
    </Card>
  )
}

export default PieChart;