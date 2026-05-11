import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './LinearProgressWithLabel.module.css';

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let i = 1;
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 100 / props.listLength));
            if (i === props.listLength + 1) {
                clearInterval(timer);
                // alert("ย้ายข้อมูลสำเร็จ")
                props.handleProcessSuccess(true)
            }
            i = i + 1;
        }, 1200);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles.root}>
            <LinearProgressWithLabel value={progress} />
        </div>
    );
}
