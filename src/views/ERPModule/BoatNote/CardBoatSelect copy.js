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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import ModalManagementFullPage from '../../../components/ModalManagementFullPage';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width:'100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalCustomers = ({ className, ...rest }) => {
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
          <></>
        }
        modalDetail={
          <div>123</div>
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
            <Avatar className={classes.avatar}>
              <HourglassEmptyIcon />
            </Avatar>
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
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
