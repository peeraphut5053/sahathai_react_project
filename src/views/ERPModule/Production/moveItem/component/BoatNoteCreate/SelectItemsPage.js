import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import { Input, TextField, Paper } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: 10
    },
}));


export default function SelectItemsPage(props) {
    

    return (
        <div >
            <DialogTitle id="simple-dialog-title">{props.ItemSelectDialogHeader}</DialogTitle>
            <List>

                <ListItem style={{ backgroundColor: '#e3f2fd'}}  >
                    <ListItemAvatar>
                        <Avatar>
                            <ViewWeekIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <TextField id="outlined-basic" label="barcode" variant="outlined" 
                    // onKeyUp={handleKeyPress}  
                    />
                </ListItem>
                <List style={{ maxHeight: 280, overflow: 'auto' }}>
                    {/* {items.map((item) => ( */}
                        <ListItem button 
                        // onClick={() => handleSeltedItem(item.id)} 
                        // key={item.id}
                        >{/*
                            <ListItemAvatar>
                                 <Avatar className={classes.avatar}>
                                    {props.ItemSelectedIcon}
                                </Avatar> 
                            </ListItemAvatar>*/}
                            {/* <ListItemText primary={item.id} /> */}
                        </ListItem>
                    {/* ))} */}
                </List>


                {/* <ListItem autoFocus button onClick={() => handleSeltedItem('addAccount')} >
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem> */}
                
            </List>
        </div>
    );
}
