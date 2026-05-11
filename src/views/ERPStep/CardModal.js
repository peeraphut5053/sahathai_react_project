import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';

const Root = styled('div')({
    flexGrow: 1,
});

const RootCard = styled(Card)({
    flexGrow: 1,
});

const Media = styled(CardMedia)({
    height: 300,
    widows: 300,
});

export default function ComplexGrid(props) {
    return (
        <Root>
            <RootCard>
                <CardActionArea>
                    <Media
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
            </RootCard>
        </Root>
    );
}
