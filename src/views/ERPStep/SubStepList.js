import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        padding: 0,
    },
    listSection: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    listItem: {
        borderRadius: "1em",
        padding: 0,
    },

}));

export default function SubStepList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root} subheader={<li />} >
            {/* {JSON.stringify(props.stepCase.detail)} */}
            {props.stepCase.detail.map((item, index) => (
                <ListItem style={{ padding: 0, paddingBottom: 0, paddingLeft: 20 }}
                    button
                    key={`item-${index} >>${item.title}`}
                    onClick={() => {
                        if (item.title) {
                            props.setCaseTitle(item.title)
                            props.setCaseDescription(item.description)
                        }else{
                            props.setCaseTitle("")
                            props.setCaseDescription("")
                        }

                        if (item.subdetail) {
                            props.setshowSubDetail(item.subdetail)
                        }else{
                            props.setshowSubDetail([])
                        }

                    }}>
                    {/* {JSON.stringify(item)} */}
                    <ListItemText primary={`${item.title} `} />
                </ListItem>
            ))}
        </List>
    );
}
