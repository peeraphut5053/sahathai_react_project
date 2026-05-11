import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import * as colors from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import MoneyIcon from '@mui/icons-material/Money';
import ModalManagementFullPage from '../components/ModalManagementFullPage';
import ReportProductFinish from '../ERPModule/Production/ReportProductFinish';


const RootCard = styled(Card)({
  height: '100%',
});

const ReportAvatar = styled(Avatar)({
  backgroundColor: colors.red[600],
  height: 56,
  width: 56
});

const CardReportProductFinish = ({ className, ...rest }) => {
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
          <>รายงานอายุสินค้าสำเร็จรูป</>
        }
        modalDetail={
          <ReportProductFinish />
        }

        open={openModalItem}
        onClose={handleCloseModalItem}
      />


      <CardContent
        onClick={() => setOpenModalItem(true)}
        style={{ cursor: "pointer" }}
      >
        <Grid
          container justify="space-between" spacing={3}
          onClick={() => setOpenModalItem(true)}
        >
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6" >
              รายงาน
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              อายุสินค้าสำเร็จรูป
            </Typography>
          </Grid>
          <Grid item>
            <ReportAvatar>
              <MoneyIcon />
            </ReportAvatar>
          </Grid>
        </Grid>
        {/* <Box
          mt={0}
          display="flex"
          alignItems="center"

        >
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
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

CardReportProductFinish.propTypes = {
  className: PropTypes.string
};

export default CardReportProductFinish;
