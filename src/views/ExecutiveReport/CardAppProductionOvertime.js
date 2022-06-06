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

  const ExecutiveReportPresentationTab = ()=>{
    const url = '/app/ExecutiveReportPresentation';
    window.open(url, '_blank');
  }
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
