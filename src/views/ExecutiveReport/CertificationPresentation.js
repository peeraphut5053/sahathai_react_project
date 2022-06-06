import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0.5,
    },
    paper: {
        padding: theme.spacing(0.5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minHeight: '72vh'
    },
    title: {
        color: 'black',
        textAlign: 'left'
    },
    demo: {
        color: 'black',
        fontSize: '20vh'
    },
    listItemText: {
        fontSize: '0.09em',//Insert your required size
    },
    listItem:{
        padding:'0'
    }
    
}));

export default function CertificationPresentation() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Grid item xs={12} >
                            <Typography variant="h2" className={classes.title}> System  </Typography>
                            <div className={classes.demo}>
                                <List >
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="ISO 9001:2015" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="API QR ISO-2015" />
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper} >
                        <Grid item xs={12} >
                            <Typography variant="h2" className={classes.title}> Product  </Typography>
                            <div className={classes.demo} >
                                <List >
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="UL+FM:ASTM A135" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="UL+FM:ASTM A53" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="UL+FM:ASTM A795" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="TIS.1228:2561 " />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="TIS.276:2562" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="TIS.107:2561" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="NSF 61" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="NSF 372" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="EN 10219:Regulation (EU) No.305/2011" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="ACRS:AS/N2S 1163:2016" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon> <ArrowRightIcon /> </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}} primary="API 5L PSL1" />
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Grid item xs={12} >
                            <Typography variant="h2" className={classes.title}> Laboratory  </Typography>
                            <div className={classes.demo}>
                                <List >
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText classes={{primary:classes.listItemText}}  primary="ISO 17025:2561" />
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
