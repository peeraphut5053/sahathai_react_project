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
  makeStyles,
  Paper,
  Chip
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import ModalManagement from '../../../components/ModalManagement';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { right } from 'trim';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%'
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
    marginRight: theme.spacing(1)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '90%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textAlign: 'right',
  },
}));

const WorkCenterGroup = (props, { className, ...rest }) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [openModalItem, setOpenModalItem] = React.useState(false);

  const handleCloseModalItem = async () => {
    setOpenModalItem(false);
  };


  return (
    <Card
      // className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <ModalManagement
        modalDetail={
          <>BUDGET</>
        }
        open={openModalItem}
        onClose={handleCloseModalItem}
      /> */}


      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={1}
          onClick={() => setOpenModalItem(true)}
        >
          <Grid item>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"

            >
              {props.workcenter_name}
            </Typography>
            {/* <Typography
              color="textPrimary"
              variant="h3"
            >
              Slit
            </Typography> */}
          </Grid>
          <Grid item>
            {/* <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar> */}
          </Grid>
        </Grid>
        <Box
          mt={0}
          display="flex"
          alignItems="center"
          style={{ overflowY: 'auto', height: '20vh' }}
        >

          <div className={classes.root}>
            {/* {JSON.stringify(props.data)} */}
            {
              props.data.map((x) =>
                <>
                  <Accordion expanded={expanded === x.wc} onChange={handleChange(x.wc)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <div className={classes.heading}>
                        <Typography className={classes.heading}>{x.wc}</Typography>

                      </div>
                      <div className={classes.secondaryHeading} >
                        <Typography className={classes.secondaryHeading}>{x.qty}</Typography>

                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className={classes.column} />
                      <div className={classes.column}>
                        <Chip label="Barbados" onDelete={() => { }} />
                      </div>
                      <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant="caption">
                          Select your destination of choice
              <br />
                          <a href="#secondary-heading-and-columns" className={classes.link}>
                            Learn more
              </a>
                        </Typography>
                      </div>
                    </AccordionDetails>
                  </Accordion>

                </>
              )
            }

          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

WorkCenterGroup.propTypes = {
  className: PropTypes.string
};

export default WorkCenterGroup;
