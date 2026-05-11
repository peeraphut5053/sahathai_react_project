import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ModalManagement from '../components/ModalManagement';
import CardModal from './CardModal';


const Root = styled('div')({
    flexGrow: 1,
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
}));

const ImageButton = styled(ButtonBase)({
    width: 128,
    height: 128,
});

const Image = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function ComplexGrid(props) {
    const [openModalItem, setOpenModalItem] = React.useState(false);
    // setOpenModalItem={setOpenModalItem}
    // open={openModalItem}
    const handleCloseModalItem = async () => {
        setOpenModalItem(false);
    };

    return (
        <Root>
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
            <StyledPaper>
                <Grid container spacing={2}>
                    <Grid item>
                        <ImageButton onClick={setOpenModalItem}>
                            <Image alt="complex" src={props.img} />
                        </ImageButton>
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
            </StyledPaper>
        </Root>
    );
}
