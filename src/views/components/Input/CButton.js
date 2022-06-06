import React from 'react';
import { Button} from '@material-ui/core';


const CButton = (props) => {

    return (
        <Button
            
            color="primary"
            fullWidth
            size="medium"
            variant="contained"
            onClick={props.onClick}
            disabled={props.disabled}
            style={{margin:3}}
        >{props.label}
        
        </Button>
    );
};
export default CButton
