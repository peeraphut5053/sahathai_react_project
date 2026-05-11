import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const RootList = styled(List)(({ theme }) => ({
    width: '100%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    padding: 0,
}));

export default function SubStepList(props) {
    return (
        <RootList subheader={<li />} >
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
        </RootList>
    );
}
