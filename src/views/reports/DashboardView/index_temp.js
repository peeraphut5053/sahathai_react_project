// Helper function to get status background
const getStatusBackground = (status) => {
    switch (status) {
        case 'green':
            return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        case 'yellow':
            return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        case 'red':
            return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        default:
            return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    }
};

// Render work center card
<Paper
    onClick={() => { setOpen(true); setWorkCenter(item) }}
    className={classes.paper}
    style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: getStatusBackground(item.status),
        color: '#fff',
        fontWeight: 600
    }}
    variant="outlined"
    square
>
    {item.wc}
    {item.status === 'green' && <SettingsIcon className={`${classes.rotating} ${classes.pulsing}`} />}
    {item.status === 'red' && <SettingsIcon />}
    {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
</Paper>
