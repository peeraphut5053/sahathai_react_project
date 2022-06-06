import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  useTheme
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import API from '../components/API';




const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 120,
    width: 120
  },

}));



const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();

  const theme = useTheme();


  const [V_STS_execSUM_Outs_Coil, setV_STS_execSUM_Outs_Coil] = useState([])
  const [V_STS_execSUM_Outs_Strip, setV_STS_execSUM_Outs_Strip] = useState([])
  const [V_STS_execSUM_Outs_ProcessingPipe, setV_STS_execSUM_Outs_ProcessingPipe] = useState([])
  const [V_STS_execSUM_Outs_FinishedPipe, setV_STS_execSUM_Outs_FinishedPipe] = useState([])
  const [V_STS_execSUM_Outs_Finished_BarePipe, setV_STS_execSUM_Outs_Finished_BarePipe] = useState([])
  const [V_STS_execSUM_Outs_Finished_BundledPipe, setV_STS_execSUM_Outs_Finished_BundledPipe] = useState([])


  const SearchOutStanding = () => {
    API.get(`API_ExecutiveReport/data.php?load=V_STS_execSUM_Outs_Coil`)
      .then(res => {
        (res.data) ? setV_STS_execSUM_Outs_Coil(res.data) : setV_STS_execSUM_Outs_Coil([])
      })
    API.get(`API_ExecutiveReport/data.php?load=V_STS_execSUM_Outs_Strip`)
      .then(res => {
        (res.data) ? setV_STS_execSUM_Outs_Strip(res.data) : setV_STS_execSUM_Outs_Strip([])
      })
    API.get(`API_ExecutiveReport/data.php?load=V_STS_execSUM_Outs_ProcessingPipe`)
      .then(res => {
        (res.data) ? setV_STS_execSUM_Outs_ProcessingPipe(res.data) : setV_STS_execSUM_Outs_ProcessingPipe([])
      })
    API.get(`API_ExecutiveReport/data.php?load=V_STS_execSUM_Outs_FinishedPipe`)
      .then(res => {
        (res.data) ? setV_STS_execSUM_Outs_FinishedPipe(res.data) : setV_STS_execSUM_Outs_FinishedPipe([])
      })
    API.get(`API_ExecutiveReport/data.php?load=V_STS_execSUM_Outs_Finished_BarePipe`)
      .then(res => {
        (res.data) ? setV_STS_execSUM_Outs_Finished_BarePipe(res.data) : setV_STS_execSUM_Outs_Finished_BarePipe([])
      })
    API.get(`API_ExecutiveReport/data.php?load=V_STS_execSUM_Outs_Finished_BundledPipe`)
      .then(res => {
        (res.data) ? setV_STS_execSUM_Outs_Finished_BundledPipe(res.data) : setV_STS_execSUM_Outs_Finished_BundledPipe([])
      })
  }

  useEffect(() => {
    setTimeout(() => {
      SearchOutStanding()
    }, 3000);

  }, [])




  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
      style={{
        maxHeight: '100%',
        overflowY: 'scroll',
      }}
    >
      <CardHeader
        subtitle={` in total`}
        title="OUTSTANDDING"
        onClick={SearchOutStanding}
      />
      <Divider />


      <List>
        <ListItem>
          <ListItemAvatar>
            <img alt="Product" className={classes.image} src={'/static/images/products/coil.jpg'} />
          </ListItemAvatar>

          <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary="Coil" />
            </ListItem>
            <Divider />
            {V_STS_execSUM_Outs_Coil.map((value) =>
              <>
                <ListItem button>
                  <ListItemText primary={`${value.Item_Group} ${value.aged} = ${value.TotalCoil} coils (${value.sumQTY} MT)`} />
                </ListItem>
              </>
            )}
          </List>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem>
          <ListItemAvatar>
            <img alt="Product" className={classes.image} src={'/static/images/products/strip.jpg'} />
          </ListItemAvatar>

          <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary="Strip" />
            </ListItem>
            <Divider />
            {V_STS_execSUM_Outs_Strip.map((value) =>
              <>
                <ListItem button key={value.sumQTY}>
                  <ListItemText primary={`${value.Item_Group} ${value.aged} = ${value.TotalStrip} strips (${value.sumQTY} MT)`} />
                </ListItem>
              </>
            )}
          </List>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem>
          <ListItemAvatar>
            <img alt="Product" className={classes.image} src={'/static/images/products/processingPipe.jpg'} />
          </ListItemAvatar>

          <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary="ProcessingPipe" />
            </ListItem>
            <Divider />
            {V_STS_execSUM_Outs_ProcessingPipe.map((value) =>
              <>
                <ListItem button>
                  <ListItemText primary={`${value.Item_Group} ${value.aged} = ${value.TotalPipe} pcs (${value.sumQTY} MT)`} />
                </ListItem>
              </>
            )}
          </List>

        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemAvatar>
            <img alt="Product" className={classes.image} src={'/static/images/products/packing.jpg'} />
          </ListItemAvatar>

          <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary="Finished Pipe(all category)" />
            </ListItem>
            <Divider />
            {V_STS_execSUM_Outs_FinishedPipe.map((value) =>
              <>
                <ListItem button>
                  <ListItemText primary={`${value.Item_Group} ${value.aged} = ${value.TotalPipe} pcs (${value.sumQTY} MT)`} />
                </ListItem>
              </>
            )}
          </List>

        </ListItem>
      </List>
      <Divider />

      {/* <List>
        <ListItem>
          <ListItemAvatar>
            <img alt="Product" className={classes.image} src={'/static/images/products/packing2.jpg'} />
          </ListItemAvatar>
          <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary="Finished Bare Pipe" />
            </ListItem>
            <Divider />
            {V_STS_execSUM_Outs_Finished_BarePipe.map((value) =>
              <>
                <ListItem button>
                  <ListItemText primary={`${value.aged} = ${value.TotalPipe} pcs (${value.sumQTY} MT) `} />
                </ListItem>
              </>
            )}
          </List>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem>
          <ListItemAvatar variant="rounded" className={classes.rounded}>
            <img alt="Product" className={classes.image} src={'/static/images/products/packing3.jpg'} />
          </ListItemAvatar>
          <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary="Finished Governor Pipe" />
            </ListItem>
            <Divider />
            {V_STS_execSUM_Outs_Finished_BundledPipe.map((value) =>
              <>
                <ListItem button>
                  <ListItemText primary={`${value.aged} = ${value.TotalPipe} pcs (${value.sumQTY} MT)`} />
                </ListItem>
              </>
            )}
          </List>
        </ListItem>
      </List> */}

      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={SearchOutStanding}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
