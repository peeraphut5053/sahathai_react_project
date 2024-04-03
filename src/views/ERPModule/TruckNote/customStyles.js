import { makeStyles } from '@material-ui/core';
const customStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        paddingLeft: 10,
        paddingRight: 20
    },
    paper: {
        padding: theme.spacing(3),
    },
    paperModal: {
        position: 'absolute',
        width: '97%',
        height: '85%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 1),
        marginTop: '5%',
        marginLeft: '1.5%'
    },
    paperModalReasonMaster: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        marginTop: '10%',
        marginLeft: '10%'
    },
}))

export default customStyles