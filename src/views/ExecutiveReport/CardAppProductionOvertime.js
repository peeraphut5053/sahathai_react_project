import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import * as colors from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ModalManagement from '../components/ModalManagement';


const RootCard = styled(Card)({
  height: '100%'
});

const ReportAvatar = styled(Avatar)({
  backgroundColor: colors.indigo[600],
  height: 56,
  width: 56
});

const CardAppProductionOvertime = ({ className, ...rest }) => {
  const [openModalItem, setOpenModalItem] = React.useState(false);

  const handleCloseModalItem = async () => {
    setOpenModalItem(false);
  };

  const ExecutiveReportPresentationTab = ()=>{
    const url = '/app/ExecutiveReportPresentation';
    window.open(url, '_blank');
  }
  return (
    <RootCard
      className={clsx(className)}
      {...rest}
    >
      <ModalManagement
        modalDetail={
          <>รายงาน</>
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
          // onClick={() => navigate('/app/ExecutiveReportPresentation')}
          onClick={ExecutiveReportPresentationTab}
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
              นำเสนอข้อมูล
            </Typography>
          </Grid>
          <Grid item>
            <ReportAvatar>
              <AttachMoneyIcon />
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

CardAppProductionOvertime.propTypes = {
  className: PropTypes.string
};

export default CardAppProductionOvertime;
