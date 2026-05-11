import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import * as colors from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import ModalManagement from '../components/ModalManagement';
import { useNavigate } from 'react-router-dom';

const RootCard = styled(Card)({
  height: '100%'
});

const ReportAvatar = styled(Avatar)({
  backgroundColor: colors.orange[600],
  height: 56,
  width: 56
});

const CardReportProductProductionIndex = ({ className, ...rest }) => {
  const [openModalItem, setOpenModalItem] = React.useState(false);
  const navigate = useNavigate();

  const handleCloseModalItem = async () => {
    setOpenModalItem(false);
  };
  return (
    <RootCard
      className={clsx(className)}
      {...rest}
    >
      <ModalManagement
        modalDetail={
          <>Total Customers</>
        }
        open={openModalItem}
        onClose={handleCloseModalItem}
      />
      <CardContent
        onClick={() => setOpenModalItem(true)}
        style={{ cursor: "pointer" }}
      >
        <Grid
          container
          justify="space-between"
          spacing={3}
          onClick={() =>  navigate('/app/productionDashboard') }
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              รายงาน
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Production Index
            </Typography>
          </Grid>
          <Grid item>
            <ReportAvatar>
              <InsertChartIcon />
            </ReportAvatar>
          </Grid>
        </Grid>
        {/* <Box mt={3}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box> */}
      </CardContent>
    </RootCard>
  );
};

CardReportProductProductionIndex.propTypes = {
  className: PropTypes.string
};

export default CardReportProductProductionIndex;
