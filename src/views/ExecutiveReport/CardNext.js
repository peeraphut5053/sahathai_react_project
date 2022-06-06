import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import ModalManagement from '../components/ModalManagement';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.pink[600],
    height: 56,
    width: 56
  }
}));

const CardNext = ({ className, ...rest }) => {
  const classes = useStyles();
  const [openModalItem, setOpenModalItem] = React.useState(false);
  const navigate = useNavigate();

  const handleCloseModalItem = async () => {
    setOpenModalItem(false);
  };
  return (
    <Card
      className={clsx(classes.root, className)}
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
          onClick={() =>  navigate('/app/productionReport') }
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
              ...
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box mt={3}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box> */}
      </CardContent>
    </Card>
  );
};

CardNext.propTypes = {
  className: PropTypes.string
};

export default CardNext;
