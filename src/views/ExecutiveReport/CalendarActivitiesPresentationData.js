import React, { useState, useEffect } from 'react';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DataUsageIcon from '@material-ui/icons/DataUsage';
// import data from './public/static/ImEx_calender.json'
//static/images/products/product_1.png
const CoilImport = <><DataUsageIcon style={{ height: '2.5vh' }} /> Coil Import</>//Red
const BulkExport = <><DirectionsBoatIcon style={{ height: '2.5vh' }} /> Bulk Export</>//Yellow
const ContainerExport = <><LocalShippingIcon style={{ height: '2.5vh' }} /> Container Export</>//Green

const EventsActivity = [
    {
        id: 0,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 2, 1),
        end: new Date(2021, 2, 1),
        actType: 'ContainerExport'
    },
    {
        id: 1,
        title: ContainerExport,
        start: new Date(2021, 2, 5),
        end: new Date(2021, 2, 5),
        actType: 'ContainerExport'
    },

    {
        id: 2,
        title: ContainerExport,
        start: new Date(2021, 2, 19),
        end: new Date(2021, 2, 19),
        actType: 'ContainerExport'
    },

    {
        id: 3,
        title: ContainerExport,
        start: new Date(2021, 2, 22, 9, 0, 0, 0),
        end: new Date(2021, 2, 23, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 4,
        title: ContainerExport,
        start: new Date(2021, 3, 1, 9, 0, 0, 0),
        end: new Date(2021, 3, 1, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 5,
        title: ContainerExport,
        start: new Date(2021, 3, 5, 9, 0, 0, 0),
        end: new Date(2021, 3, 5, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 6,
        title: CoilImport,
        start: new Date(2021, 3, 8, 9, 0, 0, 0),
        end: new Date(2021, 3, 11, 10, 0, 0, 0),
        actType: 'CoilImport'
    },
    
    {
        id: 7,
        title: ContainerExport,
        start: new Date(2021, 3, 19, 9, 0, 0, 0),
        end: new Date(2021, 3, 19, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 8,
        title: ContainerExport,
        start: new Date(2021, 3, 22, 9, 0, 0, 0),
        end: new Date(2021, 3, 23, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 9,
        title: ContainerExport,
        start: new Date(2021, 4, 19, 9, 0, 0, 0),
        end: new Date(2021, 4, 20, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 10,
        title: CoilImport,
        start: new Date(2021, 4, 19, 9, 0, 0, 0),
        end: new Date(2021, 4, 20, 10, 0, 0, 0),
        actType: 'CoilImport'
    },
    {
        id: 11,
        title: ContainerExport,
        start: new Date(2021, 4, 25, 9, 0, 0, 0),
        end: new Date(2021, 4, 25, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 12,
        title: ContainerExport,
        start: new Date(2021, 4, 27, 9, 0, 0, 0),
        end: new Date(2021, 4, 27, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 13,
        title: BulkExport,
        start: new Date(2021, 4, 25, 9, 0, 0, 0),
        end: new Date(2021, 4, 31, 10, 0, 0, 0),
        actType: 'BulkExport'
    },
    {
        id: 14,
        title: BulkExport,
        start: new Date(2021, 5, 1, 9, 0, 0, 0),
        end: new Date(2021, 5, 29, 10, 0, 0, 0),
        actType: 'BulkExport'
    },
    {
        id: 15,
        title: ContainerExport,
        start: new Date(2021, 5, 7, 9, 0, 0, 0),
        end: new Date(2021, 5, 8, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 16,
        title: ContainerExport,
        start: new Date(2021, 5, 12, 9, 0, 0, 0),
        end: new Date(2021, 5, 12, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 17,
        title: ContainerExport,
        start: new Date(2021, 5, 14, 9, 0, 0, 0),
        end: new Date(2021, 5, 14, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 18,
        title: ContainerExport,
        start: new Date(2021, 5, 19, 9, 0, 0, 0),
        end: new Date(2021, 5, 19, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 19,
        title: ContainerExport,
        start: new Date(2021, 6, 3, 9, 0, 0, 0),
        end: new Date(2021, 6, 3, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 20,
        title: ContainerExport,
        start: new Date(2021, 6, 5, 9, 0, 0, 0),
        end: new Date(2021, 6, 5, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },

    {
        id: 21,
        title: ContainerExport,
        start: new Date(2021, 6, 9, 9, 0, 0, 0),
        end: new Date(2021, 6, 9, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 22,
        title: ContainerExport,
        start: new Date(2021, 6, 15, 9, 0, 0, 0),
        end: new Date(2021, 6, 16, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 23,
        title: ContainerExport,
        start: new Date(2021, 6, 19, 9, 0, 0, 0),
        end: new Date(2021, 6, 19, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 24,
        title: CoilImport,
        start: new Date(2021, 6, 15, 9, 0, 0, 0),
        end: new Date(2021, 6, 19, 10, 0, 0, 0),
        actType: 'CoilImport'
    },
    {
        id: 25,
        title: ContainerExport,
        start: new Date(2021, 6, 12, 9, 0, 0, 0),
        end: new Date(2021, 6, 12, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 26,
        title: ContainerExport,
        start: new Date(2021, 6, 21, 9, 0, 0, 0),
        end: new Date(2021, 6, 21, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 27,
        title: ContainerExport,
        start: new Date(2021, 7, 2, 9, 0, 0, 0),
        end: new Date(2021, 7, 2, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 28,
        title: ContainerExport,
        start: new Date(2021, 7, 6, 9, 0, 0, 0),
        end: new Date(2021, 7, 6, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 29,
        title: ContainerExport,
        start: new Date(2021, 7, 9, 9, 0, 0, 0),
        end: new Date(2021, 7, 9, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 30,
        title: ContainerExport,
        start: new Date(2021, 7, 11, 9, 0, 0, 0),
        end: new Date(2021, 7, 11, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 31,
        title: ContainerExport,
        start: new Date(2021, 7, 13, 9, 0, 0, 0),
        end: new Date(2021, 7, 13, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 33,
        title: ContainerExport,
        start: new Date(2021, 6, 29, 9, 0, 0, 0),
        end: new Date(2021, 6, 29, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    {
        id: 34,
        title: ContainerExport,
        start: new Date(2021, 6, 27, 9, 0, 0, 0),
        end: new Date(2021, 6, 27, 10, 0, 0, 0),
        actType: 'ContainerExport'
    },
    
    {
        id: 39,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 7, 16),
        end: new Date(2021, 7, 16),
        actType: 'ContainerExport'
    },
    {
        id: 40,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 7, 19),
        end: new Date(2021, 7, 19),
        actType: 'ContainerExport'
    },
    {
        id: 41,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 7, 21),
        end: new Date(2021, 7, 21),
        actType: 'ContainerExport'
    },
    {
        id: 42,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 7, 26),
        end: new Date(2021, 7, 26),
        actType: 'ContainerExport'
    },
    {
        id: 43,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 8, 1),
        end: new Date(2021, 8, 1),
        actType: 'ContainerExport'
    },
    {
        id: 44,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 8,6 ),
        end: new Date(2021, 8,6 ),
        actType: 'ContainerExport'
    },
    {
        id: 45,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 8,11 ),
        end: new Date(2021, 8,11 ),
        actType: 'ContainerExport'
    },
    {
        id: 46,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 8,13 ),
        end: new Date(2021, 8,13 ),
        actType: 'ContainerExport'
    },
    {
        id: 47,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 8,17 ),
        end: new Date(2021, 8,17 ),
        actType: 'ContainerExport'
    },
    {
        id: 48,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 8,20 ),
        end: new Date(2021, 8,20 ),
        actType: 'ContainerExport'
    },
    {
        id: 49,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 8,23 ),
        end: new Date(2021, 8,23 ),
        actType: 'ContainerExport'
    },
    {
        id: 50,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 9,2 ),
        end: new Date(2021, 9,4 ),
        actType: 'ContainerExport'
    },
    
    {
        id: 51,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 9,8 ),
        end: new Date(2021, 9,8 ),
        actType: 'ContainerExport'
    },
    {
        id: 52,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 9,26 ),
        end: new Date(2021, 9,26 ),
        actType: 'ContainerExport'
    },
    {
        id: 53,
        title: BulkExport,
        allDay: true,
        start: new Date(2021, 9,16 ),
        end: new Date(2021, 9,29 ),
        actType: 'BulkExport'
    },
    {
        id: 54,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 10,8 ),
        end: new Date(2021, 10,8 ),
        actType: 'ContainerExport'
    },
    {
        id: 55,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 10,12 ),
        end: new Date(2021, 10,12 ),
        actType: 'ContainerExport'
    },
    {
        id: 56,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 10,18 ),
        end: new Date(2021, 10,18 ),
        actType: 'ContainerExport'
    },
    {
        id: 57,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 10,22 ),
        end: new Date(2021, 10,22 ),
        actType: 'ContainerExport'
    },
    {
        id: 58,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 10,25 ),
        end: new Date(2021, 10,27 ),
        actType: 'ContainerExport'
    },
    {
        id: 59,
        title: BulkExport,
        allDay: true,
        start: new Date(2021, 10,18 ),
        end: new Date(2021, 11,12 ),
        actType: 'BulkExport'
    },
    {
        id: 60,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 11,3 ),
        end: new Date(2021, 11,3 ),
        actType: 'ContainerExport'
    },
    {
        id: 61,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 11,7 ),
        end: new Date(2021, 11,7 ),
        actType: 'ContainerExport'
    },
    {
        id: 62,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 11,9 ),
        end: new Date(2021, 11,9 ),
        actType: 'ContainerExport'
    },
    {
        id: 63,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 11,17 ),
        end: new Date(2021, 11,17 ),
        actType: 'ContainerExport'
    },
    {
        id: 64,
        title: ContainerExport,
        allDay: true,
        start: new Date(2021, 11,28 ),
        end: new Date(2021, 11,28 ),
        actType: 'ContainerExport'
    },
    {
        id: 65,
        title: CoilImport,
        allDay: true,
        start: new Date(2021, 11,11 ),
        end: new Date(2021, 11,17 ),
        actType: 'CoilImport'
    },
    {
        id: 66,
        title: BulkExport,
        start: new Date(2022, 0, 4, 9, 0, 0, 0),
        end: new Date(2022, 0, 5, 10, 0, 0, 0),
        actType: 'BulkExport'
    },
    {
        id: 66,
        title: CoilImport,
        allDay: true,
        start: new Date(2022, 0,6 ),
        end: new Date(2022, 0,15 ),
        actType: 'CoilImport'
    },
    {
        id: 67,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 0,7 ),
        end: new Date(2022, 0,7 ),
        actType: 'ContainerExport'
    },
    {
        id: 67,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 0,14 ),
        end: new Date(2022, 0,16 ),
        actType: 'ContainerExport'
    },
    {
        id: 68,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 0,19 ),
        end: new Date(2022, 0,19 ),
        actType: 'ContainerExport'
    },
    {
        id: 69,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 0,25 ),
        end: new Date(2022, 0,25 ),
        actType: 'ContainerExport'
    },
    {
        id: 70,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 0,28 ),
        end: new Date(2022, 0,28 ),
        actType: 'ContainerExport'
    },
    {
        id: 71,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 0,31 ),
        end: new Date(2022, 0,31 ),
        actType: 'ContainerExport'
    },
    {
        id: 72,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 1,9 ),
        end: new Date(2022, 1,9 ),
        actType: 'ContainerExport'
    },
    {
        id: 73,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 1,14 ),
        end: new Date(2022, 1,14 ),
        actType: 'ContainerExport'
    },
    {
        id: 74,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 1,25 ),
        end: new Date(2022, 1,25 ),
        actType: 'ContainerExport'
    },
    {
        id: 75,
        title: BulkExport,
        allDay: true,
        start: new Date(2022, 1,25 ),
        end: new Date(2022, 1,25 ),
        actType: 'BulkExport'
    }, 
    {
        id: 76,
        title: CoilImport,
        allDay: true,
        start: new Date(2022, 1,18 ),
        end: new Date(2022, 1,21 ),
        actType: 'CoilImport'
    },
    {
        id: 77,
        title: BulkExport,
        allDay: true,
        start: new Date(2022, 2,8 ),
        end: new Date(2022, 2,23 ),
        actType: 'BulkExport'
    },
    {
        id: 78,
        title: ContainerExport,
        allDay: true,
        start: new Date(2022, 2,14 ),
        end: new Date(2022, 2,14 ),
        actType: 'ContainerExport'
    },
]


export default EventsActivity;