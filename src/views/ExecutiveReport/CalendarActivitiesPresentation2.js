import React, { useState, useEffect } from 'react';
import './react-big-calendar.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Grid,
    makeStyles,
    colors,
} from '@material-ui/core';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import EventsActivity from './CalendarActivitiesPresentationData'
import { setTimeout } from 'timers';
const localizer = momentLocalizer(moment)


moment.locale("th");

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


const CalendarActivitiesPresentation = (props,{ className, ...rest }) => {
    const classes = useStyles();
    const [defaultDate, setdefaultDate] = useState(props.defaultDate)

    useEffect(() => {
        setTimeout(() => {
            setdefaultDate(props.defaultDate) 
        }, 1000);
    }, [])
    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardContent  >
                {JSON.stringify(props.defaultDate)}
                <Grid
                    container
                    justify="space-between"
                    spacing={1}
                >
                    <Grid item xs={12}>
                        <Calendar
                            defaultDate={new Date(2021, 4, 1)}
                            localizer={localizer}
                            events={props.EventsActivity}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '74vh', fontSize: '1.5vh', fontFamily: 'Roboto' }}
                            eventPropGetter={
                                (event, start, end, isSelected) => {
                                    let newStyle = {
                                        backgroundColor: "lightgrey",
                                        color: 'white',
                                        borderRadius: "0px",
                                        border: "none"
                                    };
                                    if (event.actType == 'BulkExport') {
                                        newStyle.backgroundColor = colors.yellow[700]
                                    } else if (event.actType == 'ContainerExport') {
                                        newStyle.backgroundColor = colors.green[500]
                                    } else if (event.actType == 'CoilImport') {
                                        newStyle.backgroundColor = colors.red[500]
                                    }
                                    return {
                                        className: "",
                                        style: newStyle
                                    };
                                }
                            }
                        />
                    </Grid>
                    <Grid container xs={12} spacing={3}>
                        <Grid item style={{ color: colors.red[500], fontFamily: 'Roboto' }} ><DataUsageIcon /> Import Coil loaded from vessel</Grid>
                        <Grid item style={{ color: colors.yellow[700], fontFamily: 'Roboto' }} ><><DirectionsBoatIcon /> Export finished pipe loaded to bulk vessel </></Grid>
                        <Grid item style={{ color: colors.green[500], fontFamily: 'Roboto' }} ><LocalShippingIcon /> Export finished pipe loaded to Container</Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

CalendarActivitiesPresentation.propTypes = {
    className: PropTypes.string
};

export default CalendarActivitiesPresentation;
