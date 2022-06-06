import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import ModalManagementFullPage from '../components/ModalManagementFullPage';
import ReportProductFinish from '../ERPModule/Production/ReportProductFinish';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',

  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(0)
  }
}));

const CardReportProductFinish = ({ className, ...rest }) => {
  const classes = useStyles();

  const [openModalItem, setOpenModalItem] = React.useState(false);

  const handleCloseModalItem = async () => {
    setOpenModalItem(false);
  };


  return (
    <Card
      className={clsx(classes.root, className)}
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
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
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
    </Card>
  );
};

CardReportProductFinish.propTypes = {
  className: PropTypes.string
};

export default CardReportProductFinish;
