import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import * as colors from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ModalManagementFullPage from '../components/ModalManagementFullPage';
import ReportProductForming from '../ERPModule/Production/ReportProductForming';

const RootCard = styled(Card)({
  height: '100%',
  width:'100%'
});

const ReportAvatar = styled(Avatar)({
  backgroundColor: colors.green[600],
  height: 56,
  width: 56
});

const TotalCustomers = ({ className, ...rest }) => {
  const [openModalItem, setOpenModalItem] = React.useState(false);

  const handleCloseModalItem = async () => {
    setOpenModalItem(false);
  };
  return (
    <RootCard
      className={clsx(className)}
      {...rest}

    >
      <ModalManagementFullPage
        modalHeader={
          <>รายงานอายุสินค้าระหว่างผลิต</>
        }
        modalDetail={
          <ReportProductForming />
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
              อายุสินค้าระหว่างผลิต
            </Typography>
          </Grid>
          <Grid item>
            <ReportAvatar>
              <HourglassEmptyIcon />
            </ReportAvatar>
          </Grid>
        </Grid>
        {/* <Box
          mt={0}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            16%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </RootCard>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
