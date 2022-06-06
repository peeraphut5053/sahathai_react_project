import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ModalManagement from '../components/ModalManagement';
import CardModal from './CardModal';


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
}));

export default function ComplexGrid(props) {
    const classes = useStyles();

    const [openModalItem, setOpenModalItem] = React.useState(false);
    // setOpenModalItem={setOpenModalItem}
    // open={openModalItem}
    const handleCloseModalItem = async () => {
        setOpenModalItem(false);
    };

    return (
        <div className={classes.root}>
            <ModalManagement
                modalDetail={
                    <CardModal
                        title={props.title}
                        description={props.description}
                        department={props.department}
                        img={props.img}
                        link={props.link}
                    />
                }

                open={openModalItem}
                onClose={handleCloseModalItem}
            />
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image} onClick={setOpenModalItem}>
                            <img className={classes.img} alt="complex" src={props.img} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    {props.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {props.description}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {props.department}
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    Link
                </Typography>
                            </Grid> */}
                        </Grid>
                        <Grid item>
                            {/* <Typography variant="subtitle1">$19.00</Typography> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
