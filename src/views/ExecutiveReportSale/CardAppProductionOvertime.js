import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
  LinearProgress,
  Box
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ModalManagement from '../components/ModalManagement';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const CardAppProductionOvertime = ({ className, ...rest }) => {
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
          onClick={() => navigate('/app/ProductionOvertime')}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              โปรแกรม
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              บันทึก OT พนักงาน
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
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

CardAppProductionOvertime.propTypes = {
  className: PropTypes.string
};

export default CardAppProductionOvertime;
