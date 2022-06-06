import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '100%',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    media: {
        height: 300,
        widows: 300,
    },
}));

export default function ComplexGrid(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.img}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">{props.title}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
    {props.description}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary"
                        onClick={() => window.open(
                            props.link,
                            "_blank")}>Link</Button>
                    {/* <Button size="small" color="primary">Learn More</Button> */}
                </CardActions>
            </Card>
        </div>
    );
}
